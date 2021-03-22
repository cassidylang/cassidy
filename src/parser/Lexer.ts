class Lexer {
    constructor() {};
    public static parseList(str: string) {
        let tokenArray: Array<string>, strlist=str.split(''), token = '', tokenIndex = 0, inString = false, inTemplate = false;
        strlist.forEach(e => {
            if (List.List.find(el => el.keyword === token)) {
                tokenArray.push(token);
                tokenIndex+=1;
                token='';
            } else if (token === '\'' || token === '\"') {
                token+=e;
                tokenIndex+=1;
                inString = !inString ? true : false;
            } else if (token === '\`') {
                token+=e;
                tokenIndex+=1;
                inTemplate = !inTemplate ? true : false;
            } else token+=e;
        });
    }
}