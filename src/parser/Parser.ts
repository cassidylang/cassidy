import { ASTNode, BodyBlock, Program, VariableDeclaration, Empty, IfStatement, Statement } from "../ast/AST";
import { Expression } from "../ast/BinaryExpression";
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
        let node: Statement = new Empty();
        switch (this.current.type) {
            case TokenType.L_CURLY:
                node = this.parseBlock();
                break;
            case TokenType.IF:
                node = this.parseIf();
        }
        return node;
    }
    parseIf() {
        let node:IfStatement = new IfStatement(new Empty, new BodyBlock([]), new Empty());
        this.eat(TokenType.IF);
        this.eat(TokenType.L_PAREN);
        node.expr = this.parseExpression()
        this.eat(TokenType.R_PAREN);
        node.body = this.parseBlock();
        while (this.current.type === TokenType.ELSE || this.current.type === TokenType.ELSE_IF) {
            if (this.current.type === TokenType.ELSE) {}
        }
        return node;
        
    }
    parseExpression() {
        let node: Expression = new Empty;
        return node;
    }
    parseBlock() {
        let node: BodyBlock = new BodyBlock([]);
        this.eat(TokenType.L_CURLY);
        node.components = this.parseStatements();
        this.eat(TokenType.R_CURLY);
        return node;
    }
    parseStatements() {
        let statements: Statement[] = [];
        while (this.parseStatement() != Empty) {
            statements.push(this.parseStatement());
        }
        return statements;
    }
}