import { ASTNode, BodyBlock, Program, VariableDeclaration } from "../ast/AST";
class Parser {
    constructor() {}

    tokens = Lexer.tokens;
    ptr: number = 0;
    running: boolean = true;
    global: boolean = true;
    program: Program = new Program([])
    currentAppendBody: BodyBlock = new BodyBlock([]);
    parse() {
        switch (this.tokens[this.ptr].type) {
            case TokenType.INT:
                this.parseTypedObjectDeclaration(TokenType.INT);
                break;
        }
    }
    /**
     * Inject built-in library functions into the function stack to avoid duplication
     */
    parseLibrary() {
        Stack.functionStack = Stack.functionStack.concat(Builtins.builtInPrototypeFunction, Builtins.builtInOperatorFunction);
    }   
    parseTypedObjectDeclaration(type: TokenType) {
        this.ptr+=1;
        let identifier = Lexer.tokens[this.ptr].value;
        if (Lexer.tokens[this.ptr+1].type === TokenType.SEMICOLON) {
            this.parseVariableDeclaration(type, identifier, undefined);
        } else if (Lexer.tokens[this.ptr+1].type === TokenType.L_PAREN) {
            this.parseMethod(identifier, type);
        } else if (Lexer.tokens[this.ptr+1].value === "=") {
            this.ptr+=1;
            if (Lexer.tokens[this.ptr+1].value === "(") {
                this.parseLambda(identifier, type);
            } else if (this.isVar(Lexer.tokens[this.ptr+1].type)) {
                this.ptr+=1;
                this.parseMethod(Lexer.tokens[this.ptr+1].value, Lexer.tokens[this.ptr].type);
            } else {
                this.parseVariableDeclaration(type, identifier, Lexer.tokens[this.ptr+1].value);
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

    }
    parseMethod(identifier: string, returnType:TokenType = TokenType.VOID) {

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