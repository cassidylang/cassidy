interface VarObj {
    identifier: string;
    type: string;
    value: string;
}
interface Param {
    identifier: string;
    type: string[];
    baseValue?: string;
}
interface FunctionObj {
    identifier: string;
    returnType: string[];
    parameter: Param[];
}
class Parser {
    constructor() {}

    tokens = Lexer.tokens;
    ptr: number = 0;
    variableStack: Array<VarObj> = [];
    functionStack: Array<FunctionObj> = [];
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
        this.functionStack = this.functionStack.concat(Builtins.builtInPrototypeFunction, Builtins.builtInOperatorFunction);
    }
    parseVariable(identifier: string, type: string, value:any) {
        
    }
    parseMethod(returnType:TokenType = TokenType.VOID) {
        switch (returnType) {

        }
    }
}