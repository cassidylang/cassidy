interface VarObj {
    identifier: string;
    type: string;
    value: string;
}
class Parser {
    constructor() {}

    tokens = Lexer.tokens;
    ptr: number = 0;
    variableStack: Array<VarObj> = [];
    pointerIncrement() {
        while (this.ptr<this.tokens.length-1) {
            switch (this.tokens[this.ptr].type) {
                case TokenType.USING:
                    this.parseLibrary();
                    break;
            }
            this.ptr++;
        }
    }
    parseLibrary() {
        let name = Helper.searchForLib(this.tokens[this.ptr+1].value);
        if (name) {
            
        }
    }
    parseVariable() {
        
    }
}