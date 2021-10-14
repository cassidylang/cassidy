import { Empty, FunctionDeclaration, Program, ProtoFunction, Statement, VariableDeclaration } from "../ast/AST";

//export type parseType = "if" | "statement" | "statements" | "expression";
export const ComparisonOp = TokenType.EQUAL | TokenType.LARGER | TokenType.SMALLER | TokenType.LOE | TokenType.SOE | TokenType.NOT_EQUAL;
export const BitwiseOp = TokenType.B_AND | TokenType.B_OR | TokenType.B_XOR;
export const LogicalOp = TokenType.L_AND | TokenType.L_OR | TokenType.NCO;
export const AssignmentOp = TokenType.ASSIGN | TokenType.ADD_ASSIGN | TokenType.MIN_ASSIGN | TokenType.MUL_ASSIGN | TokenType.DIV_ASSIGN | TokenType.EXPO_ASSIGN | TokenType.MOD_ASSIGN | TokenType.REM_ASSIGN | TokenType.B_OR_ASSIGN | TokenType.B_AND_ASSIGN | TokenType.B_XOR_ASSIGN | TokenType.L_OR_ASSIGN | TokenType.L_AND_ASSIGN | TokenType.NCO_ASSIGN;
class Parser {
    constructor() {}
    recursionCall: number = 0;
    tokens = Lexer.tokens;
    ptr: number = 0;
    main: boolean = false;
    program: Program = new Program([]);
    next = () => Lexer.tokens[this.ptr+1];
    current = () => Lexer.tokens[this.ptr];
    eat = (t: TokenType) => {
        if (t === this.current().type) {
            this.ptr+=1;
        } else {
            throw new Error(`Expected ${t}, got ${this.current().type}`);
        }
    }
    parseStart() {
        this.parseStatements();
    }
    parseFunctionDeclaration() {
        let node = new FunctionDeclaration("main", TokenType.VOID, []);
        // Parse void only, due to beta
        this.eat(TokenType.VOID);
        // Directly eat value, as beta only have main
        this.eat(TokenType.VALUE)
        // Don't parse args, because beta
        this.eat(TokenType.L_PAREN);
        this.eat(TokenType.R_PAREN);
        this.eat(TokenType.L_CURLY);
        node.body = this.parseStatements();
        this.eat(TokenType.R_CURLY);
        return node;
    }
    parseStatements() {
        let node = [];
        while (this.parseStatement()!==false){
            node.push(this.parseStatement);
        }
        return node;
    }
    parseStatement() {
        switch(this.current().type) {
            case TokenType.VOID:
                if (!this.main) {
                    this.parseFunctionDeclaration();
                } else {
                    throw new Error(`Cassidy doesn't support function inside function in the Beta version`);
                }
            case TokenType.INT | TokenType.STRING | TokenType.BOOL:
                this.parseVariableDeclaration();
            case TokenType.VALUE:
                this.parseProtoFunction();
        }
        return false;
    }
    parseVariableDeclaration() {
        let node = new VariableDeclaration("", TokenType.EMPTY, new Empty())
        switch(this.current().type) {
            case TokenType.INT:
                this.eat(TokenType.INT);
                node.identifier = this.current().value;
                node.type = TokenType.INT;
                if (this.current().type===TokenType.VALUE) {
                    node.right = this.current().value;
                    this.eat(this.current().type);
                }
                return node;
            case TokenType.STRING:
                this.eat(TokenType.STRING);
                node.identifier = this.current().value;
                node.type = TokenType.STRING;
                if (this.current().type===TokenType.VALUE) {
                    node.right = this.current().value;
                    this.eat(this.current().type);
                }
                return node;
            case TokenType.BOOL:
                this.eat(TokenType.BOOL);
                node.identifier = this.current().value;
                node.type = TokenType.BOOL;
                if (this.current().type===TokenType.VALUE) {
                    node.right = this.current().value;
                    this.eat(this.current().type);
                }
                return node;
        }
    }
    parseProtoFunction() {
        let node = new ProtoFunction(this.current().value, "", []);
        this.eat(TokenType.DOT);
        node.callee = this.current().value;
        node.isInnerAPICheck();
        return node;
    }
}