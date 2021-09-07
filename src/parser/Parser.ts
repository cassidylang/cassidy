import { ASTNode, BodyBlock, Program, VariableDeclaration,BinaryExpression } from "../ast/AST";
class Parser {
    constructor() {}

    tokens = Lexer.tokens;
    ptr: number = 0;
    running: boolean = true;
    global: boolean = true;
    lambda: boolean = false;
    class: boolean = false;
    program: Program = new Program([])
    currentAppendBody: BodyBlock = new BodyBlock([]);
    nextTokenValue = Lexer.tokens[this.ptr+1].value;
    parseExpression() {
        switch (this.tokens[this.ptr].type) {
            case TokenType.INT:
                this.parseTypedObjectDeclaration(TokenType.INT);
                break;
            case TokenType.IF:
                this.parseIf();
                break;
        }
    }
    parseBlock() {
        this.ptr+=1;
    } 
    parseTypedObjectDeclaration(type: TokenType) {
        this.ptr+=1;
        let identifier = Lexer.tokens[this.ptr].value;
        if (Lexer.tokens[this.ptr+1].type === TokenType.SEMICOLON) {
            this.parseVariableDeclaration(type, identifier, undefined);
        } else if (Lexer.tokens[this.ptr+1].type === TokenType.L_PAREN) {
            this.parseMethod(identifier, type);
        } else if (this.nextTokenValue === "=") {
            this.ptr+=1;
            if (this.nextTokenValue === "(") {
                this.parseLambda(identifier, type);
            } else if (this.isVar(Lexer.tokens[this.ptr+1].type)) {
                this.ptr+=1;
                this.parseMethod(this.nextTokenValue, Lexer.tokens[this.ptr].type);
            } else {
                this.parseVariableDeclaration(type, identifier, this.nextTokenValue);
            }
        }
    }
    parseVariableDeclaration(type: TokenType, identifier: string, initial: any) {
        Stack.variableStack.push({identifier: identifier, type: type, value: initial});
        if (this.global) {
            this.program.components.push(new VariableDeclaration(identifier, type, [], initial))
        }
    }
    parseLambda(identifier: string, returnType:TokenType = TokenType.VOID) {
        this.lambda = true;
        this.ptr+=1;
        let block = false,
            param: Param[] = [],
            parsingParam = true;
        while (parsingParam) {
            if (this.isVar(this.nextTokenValue.type)) {
                let paramType = this.nextTokenValue.type;
                this.ptr+=1
                let paramIdentifier = this.nextTokenValue.value;
                this.ptr+=1;
                if (this.nextTokenValue.type === TokenType.COMMA) {
                    param.push({identifier: paramIdentifier, type: paramType})
                } else if (this.nextTokenValue.type === TokenType.R_PAREN) {
                    parsingParam = false;
                    break;
                }
            }
        }
    }
    parseMethod(identifier: string, returnType:TokenType = TokenType.VOID) {

    }
    parseIf() {
        this.ptr+=1;
        let binexpr = this.parseBinaryExpression();
    }
    parseBinaryExpression(): BinaryExpression {
        this.ptr+=1;
        let parsing = true,isRight = false,mathexpr = false;
        let right: any, left: any, sign: string = "", current: any = [];
        while (parsing) {
            switch (this.tokens[this.ptr].type) {
                case TokenType.L_PAREN:
                    isRight? right = this.parseBinaryExpression() : left = this.parseBinaryExpression();
                    break;
                case TokenType.COMPARISON_OPERATOR:
                    sign = this.tokens[this.ptr].value;
                    break;
                case TokenType.R_PAREN:
                    isRight? right = current : left = current;
                    break;
                case TokenType.V_INT:
                    mathexpr = true;
            }
        }
        return {left: left, right: right, sign: sign};
    }
    parseArithmeticExpression(expr: string) {
    }
    isVar(type: TokenType) {
        let possibleType = [
            TokenType.INT,
            TokenType.FLOAT,
            TokenType.STRING,
            TokenType.BOOL
        ]
        if (possibleType.find(e=>e===type)) {
            return true;
        }
        return false;
    }
}