import * as l from '../parser/Lexer';
import * as list from '../parser/Keyword';
class Parser {
    constructor() {}
    public static variables: Array<Object>;
    public static processVariable() {
        let index = 0;
        let mutable: boolean,isStatic: boolean,isPublic,endOfLine:boolean
        l.Lexer.tokenArray.forEach(function (e) {
            if (list.List.List.find(a => a.keyword === e && a.base === 'let')) {
                for (let i = -3; i<0; i++) {
                    l.Lexer.tokenArray[index+i] === 'immutable' ? mutable = false : mutable = true;
                    l.Lexer.tokenArray[index+i] === 'static' ? isStatic = true : isStatic = false;
                    l.Lexer.tokenArray[index+i] === 'public' ? isPublic = true : isPublic = false;
                }
            }
            if (l.Lexer.tokenArray[index+2] === '=') {
                Parser.variables.push(new VariableFlag(l.Lexer.tokenArray[index+1], e, l.Lexer.tokenArray[index+3],mutable, isStatic, undefined));
            }
            index+=1;
        })
    }
}