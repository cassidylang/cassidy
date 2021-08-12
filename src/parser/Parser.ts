class Parser {
    constructor() {}

    tokens = Lexer.tokens;
    ptr: number = 0;
    pointerIncrement() {
        this.parseLibrary();
        let terminate = false;
        while (this.ptr<this.tokens.length-1 || terminate === false) {
            switch (this.tokens[this.ptr].type) {
                case TokenType.INT:
                    this.ptr+=1;
                    let identifier = this.tokens[this.ptr];
                    if (!identifier) {
                        ErrorCheck.getInvalidNameError(this.tokens[this.ptr].type, "variable")
                        terminate = true;
                        break;
                    }
                    break;
            }
            if (terminate === true) {
                break;
            }
        }
    }
    /**
     * Inject built-in library functions into the function stack to avoid duplication
     */
    parseLibrary() {
        Stack.functionStack = Stack.functionStack.concat(Builtins.builtInPrototypeFunction, Builtins.builtInOperatorFunction);
    }
    parseVariable(identifier: string, type: string, value:any) {
        Stack.variableStack.push({identifier:identifier, type: type, value:value})
    }
    parseMethod(returnType:TokenType = TokenType.VOID) {
        switch (returnType) {

        }
    }
}