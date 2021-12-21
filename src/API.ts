import {TokenType} from "./Lexer";
export namespace API {
    interface Dictionary<T> {
        [Key: string]: T;
    }
    export let api: Dictionary<any> = {
        "console.log": {type: TokenType.VOID, args: [TokenType.VALUE_STRING]},
        "eval": {type: TokenType.VOID, args: [TokenType.VALUE_STRING]},
    }; 
}