import * as l from '../parser/Lexer';
import * as list from '../parser/Keyword';
const tokens = l.Lexer.tokenArray;
class Parser {
    constructor() {}
    public static variables: Array<Object>;
    public static processVariable() {
        let index = 0;
        let mutable: boolean,isStatic: boolean,isPublic: boolean,endOfLine:boolean;
        tokens.forEach(function (e) {
            if (list.List.List.find(a => a.keyword === e && a.base === 'let')) {
                for (let i = -3; i<0; i++) {
                    /**
                     * Setting flags
                     */
                    (tokens[index+i] === 'immutable' && mutable !== false) ? mutable = false : mutable = true;
                    (tokens[index+i] === 'static' && isStatic !== true) ? isStatic = true : isStatic = false;
                    (tokens[index+i] === 'public' && isPublic !== true) ? isPublic = true : isPublic = false;
                }
            }
            index+=1;
        })
    }
}