import { ASTNode, BodyBlock, Program, VariableDeclaration, Empty, IfStatement } from "../ast/AST";
class Parser {
    constructor() {}

    tokens = Lexer.tokens;
    ptr: number = 0;
    program: Program = new Program([])
    nextTokenValue = Lexer.tokens[this.ptr+1].value;
    current = Lexer.tokens[this.ptr];
    eat = (t: TokenType) => {
        if (t === this.current.type) {
            this.ptr+=1;
        } else {
            throw new Error(`Expected ${t}, got ${this.current.type}`);
        }
    }
    parseStatement() {
        let node: ASTNode = new Empty();
        switch (this.current.type) {
            case TokenType.L_CURLY:
                node = this.parseBlock();
                break;
            case TokenType.IF:
                node
        }
        return node;
    }
    parseIf() {
        this.eat(TokenType.IF);
        this.eat(TokenType.L_PAREN);
    }
    parseBlock() {
        let node: BodyBlock = new BodyBlock([]);
        this.eat(TokenType.L_CURLY);
        node.components = this.parseStatements();
        this.eat(TokenType.R_CURLY);
        return node;
    }
    parseStatements() {
        let statements: ASTNode[] = [];
        while (this.parseStatement() != Empty) {
            statements.push(this.parseStatement());
        }
        return statements;
    }
}