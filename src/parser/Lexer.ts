enum TokenType {
    // Reserved for placeholders
    EMPTY,
    // Primitive
    SINGLE_QUOTE,
    DOUBLE_QUOTE,
    ESCAPED_SINGLE_QUOTE,
    ESCAPED_DOUBLE_QUOTE,
    TEMPLATE_LITERAL,
    ESCAPED_TEMPLATE_LITERAL,
    L_PAREN,
    R_PAREN,
    L_BRACKET,
    R_BRACKET,
    L_CURLY,
    R_CURLY,
    VALUE,
    BITWISE_OPERATOR,
    LOGICAL_OPERATOR,
    COMPARISON_OPERATOR,
    ASSIGNMENT_OPERATOR,
    MATH_OPERATOR,
    WHITESPACE,
    LINE_FEED,
    ARROW_FUNCTION,
    SEMICOLON,
    COMMENT,
    MULTILINE_COMMENT_START,
    MULTILINE_COMMENT_END,
    COMMA,
    DOT,
    // Preprocessor types
    STRING,
    TEMPLATE_STRING,
    IF,
    VOID,
    INT,
    BOOL,
    CLASS,
    METHOD,
    FOR,
    WHILE,
    ELSE_IF,
    ELSE,
    BREAK,
    TYPEOF,
    STRUCT,
    TYPE,
    ASYNC,
    AWAIT,
    SWITCH,
    CASE,
    DEFAULT,
    STATIC,
    USING,
    NEW,
    VALUE_STRING,
    FLOAT,
    V_INT,
    V_BOOL,
    IN,
    INSTANCEOF,
    IDENTIFIER,
    PLUS,
    MINUS,
    MULT,
    DIV,
    UPLUS,
    UMINUS,
    EXPONENT,
    EQUAL,
    NOT_EQUAL,
    LARGER,
    SMALLER,
    LOE, // larger or equal
    SOE, // smaller or equal
    L_OR,
    L_AND,
    L_NOT,
    B_OR,
    B_AND,
    B_XOR,
    NCO,
    ASSIGN,
    ADD_ASSIGN,
    MIN_ASSIGN,
    MUL_ASSIGN,
    DIV_ASSIGN,
    EXPO_ASSIGN,
    MOD_ASSIGN,
    REM_ASSIGN,
    B_OR_ASSIGN,
    B_AND_ASSIGN,
    B_XOR_ASSIGN,
    L_OR_ASSIGN,
    L_AND_ASSIGN,
    NCO_ASSIGN,
}
interface Token {
    type: TokenType;
    line: number
    startCol: number;
    endCol?: number;
    value?: any;
}

class Lexer {
    constructor() {};
    public static tokens: Array<Token>;
    public static buildToken(input: string) {
        let charstream = input.split("");
        let stack = "";
        let lookahead = (n: number) => charstream[n+1];
        let eat = (t: Token) => this.tokens.push(t);
        let col = 1, line = 1
        for (let i = 0; i<charstream.length; i++) {
            let char = charstream[i];
            switch (char) {
                case "\'":
                    if (this.tokens[this.tokens.length-1].type !== TokenType.SINGLE_QUOTE && stack !== "") {
                        eat({type:TokenType.VALUE, value: stack, line: line, startCol: col});
                        stack = "";
                    }
                    if (stack === "\\") {
                        eat({type: TokenType.ESCAPED_SINGLE_QUOTE, line: line, startCol: col});
                    } else if (stack === "") {
                        eat({type: TokenType.SINGLE_QUOTE, line: line, startCol: col});
                    } else {
                        eat({type:TokenType.VALUE, value: stack, line: line, startCol: col, endCol: col + stack.length-1});
                        stack = "";
                        eat({type:TokenType.SINGLE_QUOTE, line: line, startCol: col});
                    }
                    col+=1;
                        break;
                case "\"":
                    if (this.tokens[this.tokens.length-1].type !== TokenType.DOUBLE_QUOTE && stack !== "") {
                        eat({type:TokenType.VALUE, value: stack, line: line, startCol: col, endCol: col + stack.length});
                        stack = "";
                    }
                    if (stack === "\\") {
                        eat({type: TokenType.ESCAPED_DOUBLE_QUOTE,line: line, startCol: col});
                    } else if (stack === "") {
                        eat({type: TokenType.DOUBLE_QUOTE,line: line, startCol: col});
                    } else {
                        eat({type:TokenType.VALUE, value: stack, line: line, startCol: col, endCol: col + stack.length});
                        stack = "";
                        eat({type:TokenType.DOUBLE_QUOTE,line: line, startCol: col});
                    }
                    col+=1;
                        break;
                case " ":
                    eat({type:TokenType.VALUE, value: stack, line: line, startCol: col, endCol: col + stack.length});
                    stack = "";
                    eat({type:TokenType.WHITESPACE,line: line, startCol: col});
                    col+=1;
                        break;
                case "\t":
                    eat({type:TokenType.VALUE, value: stack, line: line, startCol: col, endCol: col + stack.length});
                    stack = "";
                    eat({type:TokenType.WHITESPACE,line: line, startCol: col});
                    col+=1;
                        break;
                case ";":
                    eat({type:TokenType.VALUE, value: stack, line: line, startCol: col, endCol: col + stack.length});
                    stack = "";
                    eat({type:TokenType.SEMICOLON,line: line, startCol: col});
                    col+=1;
                        break;
                case "\n":
                    eat({type:TokenType.VALUE, value: stack, line: line, startCol: col, endCol: col + stack.length});
                    stack = "";
                    eat({type:TokenType.LINE_FEED,line: line, startCol: col});
                    col+=1;
                        break; 
                case "(":
                    eat({type:TokenType.VALUE, value: stack, line: line, startCol: col, endCol: col + stack.length});
                    stack = "";
                    eat({type:TokenType.L_PAREN,line: line, startCol: col});
                    col+=1;
                        break;
                case ")":
                    eat({type:TokenType.VALUE, value: stack, line: line, startCol: col, endCol: col + stack.length});
                    stack = "";
                    eat({type:TokenType.R_PAREN,line: line, startCol: col});
                    col+=1;
                        break;
                case "{":
                    eat({type:TokenType.VALUE, value: stack, line: line, startCol: col, endCol: col + stack.length});
                    stack = "";
                    eat({type:TokenType.L_CURLY,line: line, startCol: col});
                    col+=1;
                        break;
                case "}":
                    eat({type:TokenType.VALUE, value: stack, line: line, startCol: col, endCol: col + stack.length});
                    stack = "";
                    eat({type:TokenType.R_CURLY,line: line, startCol: col});
                    col+=1;
                        break;
                case "=":
                    eat({type:TokenType.ASSIGNMENT_OPERATOR, value:"=",line: line, startCol: col});
                    col+=1;
                    break;
                case ".":
                    eat({type:TokenType.VALUE, value: stack, line: line, startCol: col, endCol: col + stack.length});
                    stack = "";
                    eat({type:TokenType.DOT,line: line, startCol: col});
                    col+=1;
                    break;
                default:
                    stack+=char;
                    col+=1;
                        break;
            }
        }
    }


    public static preprocessor() {
        for (let i = 0; i<this.tokens.length; i++) {
            if (this.tokens[i].type === TokenType.DOUBLE_QUOTE) {
                let out = this.crawl(i, TokenType.DOUBLE_QUOTE);
                let length = out[0];
                this.tokens.splice(i+1, length);
                this.tokens[i] = {type: TokenType.VALUE_STRING, value: out[1], line: this.tokens[i].line, startCol: this.tokens[i].startCol}
            } else if (this.tokens[i].type === TokenType.SINGLE_QUOTE) {
                let out = this.crawl(i, TokenType.SINGLE_QUOTE);
                let length = out[0];
                this.tokens.splice(i+1, length);
                this.tokens[i] = {type: TokenType.VALUE_STRING, value: out[1], line: this.tokens[i].line, startCol: this.tokens[i].startCol}
            } else if (this.tokens[i].type === TokenType.VALUE) {
                switch (this.tokens[i].value) {
                    case "void":
                        this.tokens[i] = {type:TokenType.VOID, line: this.tokens[i].line, startCol: this.tokens[i].startCol};
                        break;
                    case "int":
                        this.tokens[i] = {type:TokenType.INT, line: this.tokens[i].line, startCol: this.tokens[i].startCol};
                        break;
                    case "string":
                        this.tokens[i] = {type:TokenType.STRING, line: this.tokens[i].line, startCol: this.tokens[i].startCol};
                        break;
                    case "bool":
                        this.tokens[i] = {type:TokenType.BOOL, line: this.tokens[i].line, startCol: this.tokens[i].startCol};
                        break;
                }
            }
        }
    }

    public static crawl(start: number, type: TokenType, end?: TokenType): [number, string] {
        let crawling = true, output = "", index = start, endType = end || type;
        while(crawling === true) {
            if (this.tokens[index+1].type !== endType) {
                output+=this.getTokenRaw(this.tokens[index+1]);
                index++;
            } else {
                crawling = false;
            }
        }
        return [index+1, output];
    }

    public static getTokenRaw(token:Token) {
        if (token.value) {
            return token.value;
        } else {
            switch(token.type) {
                case TokenType.ESCAPED_DOUBLE_QUOTE:
                    return "\"";
                case TokenType.ESCAPED_SINGLE_QUOTE:
                    return "\'";
                case TokenType.LINE_FEED:
                    return "\n";
                case TokenType.L_PAREN:
                    return "(";
                case TokenType.L_BRACKET:
                    return "[";
                case TokenType.L_CURLY:
                    return "{";
                case TokenType.R_PAREN:
                    return ")";
                case TokenType.R_BRACKET:
                    return "]";
                case TokenType.R_CURLY:
                    return "}";
                case TokenType.DOT:
                    return ".";
                case TokenType.SEMICOLON:
                    return ";";
                case TokenType.COMMA:
                    return ",";
                case TokenType.ESCAPED_TEMPLATE_LITERAL:
                    return `\``;
                case TokenType.TEMPLATE_LITERAL:
                    return "``";
                case TokenType.WHITESPACE:
                    return " ";
            }
        }
    }
}
