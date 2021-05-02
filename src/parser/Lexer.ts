import { METHODS } from 'node:http';
import * as li from '../parser/Keyword';
export class Lexer {
    constructor() {};
    public static methodDec: Array<string> = [
        'void',
        'bool',
    ];
    public static tokenArray: Array<string>;
    public static stringPosition: Array<number>;
    public static parseList(str: string) {
        let strlist=str.split('')
        , token = '', tokenIndex = 0
        , inString = false
        , inTemplate = false;
        strlist.forEach(e => {
            let endIndex = 0
            , startIndex = 0
            , endTIndex = 0
            , startTIndex = 0;
            if ((token === '\'' || token === '\"') && (this.tokenArray[tokenIndex-1]!=='\\')) {
                token+=e;
                tokenIndex+=1
                inString = !inString ? true : false;
                if (!inString) endIndex=tokenIndex; else startIndex=tokenIndex;
            } else if (token === '\`' && this.tokenArray[tokenIndex-1]!=='\\') {
                token+=e;
                tokenIndex+=1;
                inTemplate = !inTemplate ? true : false;
                if (!inTemplate) endTIndex=tokenIndex; else startTIndex=tokenIndex;
            } else if (this.tokenArray[tokenIndex-1]==='(') {
                token+=e;
            } else if (li.List.List.find(el => el.keyword === token)&&!Lexer.methodDec.find(e=>e===token)) {
                Lexer.tokenArray.push(token);
                tokenIndex+=1;
                token='';
            } else token+=e;

        });
    }
    produceStringPair(StartIndex: number, EndIndex: number) {
        return `${StartIndex}-${EndIndex}`;
    }
    public static produceStringGroups(stringPair: string) {
        let arr = stringPair.split('-')
        , start = parseInt(arr[0])
        , end = parseInt(arr[2])
        for (let i=start; i<=end; i++) this.stringPosition.push(i);
    }
}