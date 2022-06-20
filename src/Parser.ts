import { ErrorC, ErrorCode } from "./ErrorC";
import { Access, Body, Empty, FunctionCall, FunctionDeclaration, ObjectReference, Program, ReferenceCall, Return, Statement, VariableDeclaration } from "./NodeType";
import {TokenType, Lexer, ValueType} from "./Lexer";
export class Parser {
    constructor() {}
    recursionCall: number = 0;
    tokens = Lexer.tokens;
    ptr: number = 0;
    next = () => Lexer.tokens[this.ptr+1];
    current = () => Lexer.tokens[this.ptr] || TokenType.EMPTY;
    eat = (t: TokenType) => {
        console.log(TokenType[t]);
        console.log(TokenType[this.current().type])
        if (t === this.current().type) {
            this.ptr+=1;
        } else {
            console.log(this.current());
            throw new Error(`Expected ${TokenType[t]}, got ${TokenType[this.current().type]}`);
        }
    }
    parseProgram() {
        return new Program(this.parseStatements());
    }
    parseStatement() {
        let node: Statement = new Empty();
        switch (this.current().type) {
            case TokenType.INT:
            case TokenType.STRING:
            case TokenType.BOOL:
                node = this.parsePossibleDeclaration();
                break;
            case TokenType.VALUE:
                node = this.parsePossibleReference();
                this.eat(TokenType.SEMICOLON);
                break;
            case TokenType.RETURN:
                node = this.parseReturn();
        }
        return node;
    }
    parseStatements() {
        let parsing = true, statements = [];
        while (parsing) {
            let node = this.parseStatement();
            if (node.constructor.name==="Empty") {
                parsing = false;
                break;
            } else {
                statements.push(node)
            };
        }
        return statements;
    }
    parsePossibleDeclaration(): Statement | Statement[] {
        let node: Statement | Statement[] = new Empty(),
            nodet: TokenType = TokenType.EMPTY;
        switch (this.current().type) {
            case TokenType.INT:
                this.eat(TokenType.INT)
                nodet = TokenType.INT
                break;
            case TokenType.STRING:
                this.eat(TokenType.STRING)
                nodet = TokenType.STRING
                break;
            case TokenType.BOOL:
                this.eat(TokenType.BOOL)
                nodet = TokenType.BOOL
                break;
            case TokenType.VOID:
                this.eat(TokenType.VOID)
                nodet = TokenType.VOID
                break;
        }
        if (this.current().type===TokenType.VALUE) {
            let identifier = this.current().value;
            this.eat(TokenType.VALUE);
            if (this.current().type===TokenType.L_PAREN) {
                this.eat(TokenType.L_PAREN);
                let args = this.parseArgs();
                this.eat(TokenType.R_PAREN);
                let body = this.parseBody();
                node = new FunctionDeclaration(identifier, args, body, nodet);
            } else if (this.current().type===TokenType.SEMICOLON) {
                this.eat(TokenType.SEMICOLON);
                node = new VariableDeclaration(identifier, nodet);
            } else if (this.current().type === TokenType.ASSIGN) {
                this.eat(TokenType.ASSIGN);
                if (ValueType.includes(this.current().type)) {
                    if (this.current().type!==TokenType.VALUE) {
                        node = new VariableDeclaration(identifier, nodet, this.current().value);
                        console.log(this.current());
                        if (this.current().type) this.eat(this.current().type)
                    } else {
                        node = new VariableDeclaration(identifier, nodet, this.parsePossibleReference());
                        console.log(this.current());
                        if (this.current().type) this.eat(this.current().type)
                    }
                    if (this.current().type===TokenType.COMMA) {
                        let decs = [node];
                        this.eat(TokenType.COMMA)
                        let parsing = true;
                        while (parsing) {
                            if (this.current().type === TokenType.VALUE) {
                                let vident = (this.current().value as string);
                                console.log(this.current());
                                this.eat(TokenType.VALUE)
                                if (this.current().type === TokenType.ASSIGN) {
                                    this.eat(TokenType.ASSIGN);
                                    if (ValueType.includes(this.current().type)) {
                                        decs.push(new VariableDeclaration(vident, nodet, this.current().value));
                                        if (this.current().type) this.eat(this.current().type)
                                    } else {
                                        console.log("err1",this.current());
                                        break;
                                    }
                                }
                                if (this.current().type === TokenType.COMMA) {
                                    this.eat(TokenType.COMMA)
                                } else if (this.current().type === TokenType.SEMICOLON){
                                    parsing = false;
                                    break;
                                }
                            }
                        }
                        node = decs;
                    }
                    
                    this.eat(TokenType.SEMICOLON);
                } else {
                    console.log("err1",this.current());
                }
            } else if (this.current().type===TokenType.COMMA) {
                let decs = [new VariableDeclaration(identifier, nodet)];
                this.eat(TokenType.COMMA)
                let parsing = true;
                while (parsing) {
                    if (this.current().type === TokenType.VALUE) {
                        let vident = (this.current().value as string);
                        this.eat(TokenType.VALUE)
                        if (this.current().type === TokenType.ASSIGN) {
                            this.eat(TokenType.ASSIGN);
                            if (ValueType.includes(this.current().type)) {
                                decs.push(new VariableDeclaration(vident, nodet, this.current().value));
                                if (this.current().type) this.eat(this.current().type)
                            } else {
                                console.log("err1",this.current());
                                break;
                            }
                        }
                        if (this.current().type === TokenType.COMMA) {
                            this.eat(TokenType.COMMA)
                        } else if (this.current().type === TokenType.SEMICOLON){
                            parsing = false;
                            break;
                        }
                    }
                }
                node = decs;
                this.eat(TokenType.SEMICOLON)
            }
        } else {
            let err = this.current();
            ErrorC.throwErr(ErrorCode.Reserved, {name: Lexer.getTokenRaw(err), col:err.startCol, line:err.line})
        }
        if (nodet === TokenType.VOID && node.constructor.name !== "FunctionDeclaration") {
            throw new Error("Bad void var")
        } 
        return node;
    }
    parsePossibleReference() {
        let node: ReferenceCall = new Empty(),
            parsing = true,
            onstack = false;
            while (parsing) {
                if (this.current().type === TokenType.VALUE) {
                    let identifier = this.current().value;
                    this.eat(TokenType.VALUE);
                    if (this.current().type === TokenType.L_PAREN) {
                        this.eat(TokenType.L_PAREN);
                        let checking = true, args = [], instack = false;
                        while (checking) {
                            if (ValueType.includes(this.current().type)) {
                                args.push(this.current().value);
                                this.eat(this.current().type)
                                instack = false;
                            }
                            if (instack === true) {
                                throw new Error("hanging comma");
                            }
                            if (this.current().type === TokenType.COMMA) {
                                this.eat(TokenType.COMMA);
                                instack = true;
                            } else if (this.current().type === TokenType.R_PAREN) {
                                checking = false;
                                break;
                            } else if (ValueType.includes(this.current().type)) {}
                            else {
                                throw new Error("ref parse err");
                            }
                        }
                        this.eat(TokenType.R_PAREN);
                        if (node.constructor.name === "Access") {
                            node = new Access((node as Access).left, new FunctionCall(identifier, args));
                        } else {
                            node = new FunctionCall(identifier, args); 
                        }
                    } else {
                        node = new ObjectReference(identifier);
                    }
                    onstack = false;
                }
                if (onstack===true) {
                    throw new Error("hanging dot");
                }
                if (this.current().type === TokenType.DOT) {
                    this.eat(TokenType.DOT)
                    node = new Access(node, new Empty);
                    onstack = true;
                } else {
                    parsing = false;
                    break;
                }
            }
        return node;
    }
    parseArgs() {
        let args: VariableDeclaration[] = [], parsing = true;
        if (this.current().type===TokenType.R_PAREN) return [];
        while (parsing) {
            console.log("p3");
            let nodet: TokenType = TokenType.EMPTY;
            switch (this.current().type) {
                case TokenType.INT:
                    this.eat(TokenType.INT)
                    nodet = TokenType.INT
                    break;
                case TokenType.STRING:
                    this.eat(TokenType.STRING)
                    nodet = TokenType.STRING
                    break;
                case TokenType.BOOL:
                    this.eat(TokenType.BOOL)
                    nodet = TokenType.BOOL
                    break;
            }
            if (this.current().type === TokenType.VALUE) {
                let vident = this.current().value as string;
                this.eat(TokenType.VALUE);
                if (this.current().type === TokenType.ASSIGN) {
                    this.eat(TokenType.ASSIGN);
                    if (ValueType.includes(this.current().type)) {
                        args.push(new VariableDeclaration(vident, nodet, this.current().value));
                        if (this.current().type) this.eat(this.current().type)
                    } else {
                        console.log("err2",this.current());
                        break;
                    }
                } else if (this.current().type===TokenType.R_PAREN || this.current().type===TokenType.COMMA) {
                    args.push(new VariableDeclaration(vident, nodet));
                }
            } else {
                console.log("err3",this.current());
                parsing = false;
                break;
            }
            if (this.current().type === TokenType.COMMA) {
                this.eat(TokenType.COMMA)
            } else if (this.current().type === TokenType.R_PAREN){
                parsing = false;
                break;
            } else {
                console.log("err3",this.current());
                parsing = false;
                break;
            }
        }
        return args;
    }
    parseBody() {
        let node = new Body([]);
        this.eat(TokenType.L_CURLY);
        node.statements = this.parseStatements();
        this.eat(TokenType.R_CURLY);
        return node;
    }
    parseReturn() {
        this.eat(TokenType.RETURN);
        let node = new Return(new Empty());
        switch (this.current().type) {
            case TokenType.VALUE:
                node = new Return(this.parsePossibleReference());
                break;
            case TokenType.VALUE_STRING:
            case TokenType.V_BOOL:
            case TokenType.V_INT:
                node = new Return(this.current().value);
                break;
        }
        this.eat(TokenType.SEMICOLON)
        return node;
    }
    /**
     * Expression parser
     */
}