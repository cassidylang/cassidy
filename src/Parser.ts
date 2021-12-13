import { ErrorC, ErrorCode } from "./ErrorC";
import { Body, Empty, FunctionDeclaration, Statement } from "./NodeType";
import {TokenType, Lexer} from "./Lexer";

class Parser {
    constructor() {}
    recursionCall: number = 0;
    tokens = Lexer.tokens;
    ptr: number = 0;
    next = () => Lexer.tokens[this.ptr+1];
    current = () => Lexer.tokens[this.ptr];
    eat = (t: TokenType) => {
        if (t === this.current().type) {
            this.ptr+=1;
        } else {
            throw new Error(`Expected ${t}, got ${this.current().type}`);
        }
    }
    parseStatement() {
        let node: Statement = new Empty();
        switch (this.current().type) {
            case TokenType.INT:
            case TokenType.STRING:
            case TokenType.BOOL:
                node = this.parsePossibleDeclaration();
        }
        return node;
    }
    parseStatements() {
        let parsing = true, statements = [];
        while (parsing) {
            let node = this.parseStatement();
            if (node===new Empty()) {
                parsing = false;
                break;
            } else {
                statements.push(node)
            };
        }
        return statements;
    }
    parsePossibleDeclaration(): Statement {
        let node: Statement = new Empty(),
            nodet: TokenType = TokenType.EMPTY;
        switch (this.current().type) {
            case TokenType.INT:
                this.eat(TokenType.INT)
                nodet = TokenType.INT
            case TokenType.STRING:
                this.eat(TokenType.STRING)
                nodet = TokenType.STRING
            case TokenType.BOOL:
                this.eat(TokenType.BOOL)
                nodet = TokenType.BOOL
        }
        if (this.current().type===TokenType.VALUE) {
            let identifier = this.current().value;
            this.eat(TokenType.VALUE);
            if (this.current().value===TokenType.L_PAREN) {
                this.eat(TokenType.L_PAREN);
                let args = this.parseArgs();
                this.eat(TokenType.R_PAREN);
                let body = this.parseBody();
                node = new FunctionDeclaration(identifier, args, body)
            }
        } else {
            let err = this.current();
            ErrorC.throwErr(ErrorCode.Reserved, {name: Lexer.getTokenRaw(err), col:err.startCol, line:err.line})
        }
        return node;
    }
    parseArgs() {
        let node: Statement[] = [];
        return node;
    }
    parseBody() {
        let node = new Body([]);
        this.eat(TokenType.L_CURLY);
        node.statements = this.parseStatements();
        this.eat(TokenType.R_CURLY);
        return node;
    }
}