class Lexer {
    constructor() {};
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
            if (List.List.find(el => el.keyword === token)) {
                Lexer.tokenArray.push(token);
                tokenIndex+=1;
                token='';
            } else if (token === '\'' || token === '\"') {
                token+=e;
                tokenIndex+=1
                inString = !inString ? true : false;
                if (!inString) endIndex=tokenIndex; else startIndex=tokenIndex;
            } else if (token === '\`') {
                token+=e;
                tokenIndex+=1;
                inTemplate = !inTemplate ? true : false;
                if (!inTemplate) endTIndex=tokenIndex; else startTIndex=tokenIndex;
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
        , output : Array<number> = [];
        for (let i=start; i<=end; i++) output.push(i);
        return output;
    }
}