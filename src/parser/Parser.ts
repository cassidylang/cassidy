import { ASTNode, BodyBlock, Program, VariableDeclaration, Empty, IfStatement, Statement, Literal, Identifier, MemberExpression, ProtoFunctionCallExpression } from "../ast/AST";
import { BinaryExpression, Child } from "../ast/BinaryExpression";
export type parseType = "if" | "statement" | "statements" | "expression";
class Parser {
    constructor() {}
    recursionCall: number = 0;
    tokens = Lexer.tokens;
    ptr: number = 0;
    program: Program = new Program([])
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
            case TokenType.L_CURLY:
                node = this.parseBlock();
                this.recursionCall+=1;
                break;
            case TokenType.IF:
                node = this.parseIf();
                this.recursionCall+=1;
        }
        return node;
    }
    parseIf() {
        let node:IfStatement = new IfStatement(new Literal(0), new BodyBlock([]), new Empty());
        this.eat(TokenType.IF);
        this.eat(TokenType.L_PAREN);
        node.expr = this.parseExpression();
        this.recursionCall+=1;
        this.eat(TokenType.R_PAREN);
        node.body = this.parseBlock();
        this.recursionCall+=1;
        while (this.current().type === TokenType.ELSE || this.current().type === TokenType.ELSE_IF) {
            if (this.current().type === TokenType.ELSE) {}
        }
        return node;
        
    }
    parseExpression(): Child {
        let node: Child = new Literal(false);
        switch (this.current().type) {
            case TokenType.L_PAREN:
                this.eat(TokenType.L_PAREN);
                node = this.parseExpression();
                break;
            case TokenType.IDENTIFIER:
                let cNode: Identifier | MemberExpression | ProtoFunctionCallExpression = new Identifier(this.current().value);
                this.eat(TokenType.IDENTIFIER);
                while (this.current().type === TokenType.DOT) {
                    this.eat(TokenType.DOT);
                    if (this.current().type === TokenType.IDENTIFIER) {
                        if (this.next().type !== TokenType.L_PAREN) {
                            cNode = new MemberExpression(cNode, new Identifier(this.current().value));
                            this.eat(TokenType.IDENTIFIER);
                        } else {
                            cNode = this.parseMaybePrototypeFunctionCall(cNode);
                        }
                    }
                }
        }
        return node;
    }
    parseFunctionDeclaration() {
        
    }
    parseMaybePrototypeFunctionCall(callee?: any) {
        let node = new ProtoFunctionCallExpression(this.current().value, undefined, callee);
        this.eat(TokenType.IDENTIFIER);
        this.eat(TokenType.L_PAREN);
        while (this.current().type !== TokenType.R_PAREN) {
            
        }
        return node;
    }
    parseBlock() {
        let node: BodyBlock = new BodyBlock([]);
        this.eat(TokenType.L_CURLY);
        node.components = this.parseStatements();
        this.recursionCall+=1;
        this.eat(TokenType.R_CURLY);
        return node;
    }
    parseStatements() {
        let statements: Statement[] = [];
        while (this.parseStatement() != Empty) {
            statements.push(this.parseStatement());
            this.recursionCall+=1;
        }
        return statements;
    }
}