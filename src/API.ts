import {TokenType} from "./Lexer";
export namespace API {
    interface Dictionary<T> {
        [Key: string]: T;
    }
    export let api: Dictionary<any> = {
        "console": {
            "log": {type: "function", argtype: [TokenType.STRING], return: TokenType.VOID}
        },
        "eval": {argtype: [TokenType.STRING], return: TokenType.VOID}
    }; 
}