import { threadId } from "worker_threads";
import { ASTNode, BodyBlock, Program, VariableDeclaration, Empty, IfStatement, Statement, Literal, Identifier, MemberExpression, ProtoFunctionCallExpression } from "../ast/AST";
import { BinaryExpression, Child } from "../ast/BinaryExpression";
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
                this.eat(TokenType.R_PAREN);
            default:
                node = this.parseAssignment();
        }
        return node;
    }
    parseAssignment() {
        let node: Child = this.parseLogical();
        while (this.current().type === AssignmentOp) {
            node = new BinaryExpression(node, this.current().type, this.parseLogical());
        }
        return node;
    }
    parseLogical() {
        let node: Child = this.parseBitwise();
        while (this.current().type === LogicalOp) {
            node = new BinaryExpression(node, this.current().type, this.parseBitwise());
        }
        return node;
    }
    parseBitwise() {
        let node: Child = this.parseComparison();
        while (this.current().type === BitwiseOp) {
            node = new BinaryExpression(node, this.current().type, this.parseComparison());
        }
        return node;
    }
    parseComparison() {
        let node: Child = this.parseAdd();
        while (this.current().type === ComparisonOp) {
            node = new BinaryExpression(node, this.current().type, this.parseAdd());
        }
        return node;
    }
    parseAdd() {
        let node: Child = this.parseMult();
        while (this.current().type === TokenType.PLUS || this.current().type === TokenType.MINUS) {
            node = new BinaryExpression(node, this.current().type, this.parseMult());
        }
        return node;
    }
    parseMult() {
        let node: Child = this.parseExpo();
        while (this.current().type === TokenType.MULT || this.current().type === TokenType.DIV) {
            node = new BinaryExpression(node, this.current().type, this.parseExpo());
        }
        return node;
    }
    parseExpo() {
        let node: Child = this.parseFactor();
        while (this.current().type === TokenType.EXPONENT) {
            node = new BinaryExpression(node, TokenType.EXPONENT, this.parseFactor());
        }
        return node
    }

    parseFactor() {
        let node: Child = new Literal(0);
        if (this.current().type === TokenType.L_PAREN) {
            node = this.parseExpression();
        } else if (this.current().type === TokenType.V_INT) {
            node = new Literal(this.current().value);
        } else if (this.current().type === TokenType.IDENTIFIER) {
            node = new Identifier(this.current().value);
        }
        return node;
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