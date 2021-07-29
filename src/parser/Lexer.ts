enum TokenType {
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
    CARRIAGE_RETURN,
    FORM_FEED,
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
    VAR_STRING,
    VAR_BOOL
}
interface Token {
    type: TokenType;
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
        for (let i = 0; i<charstream.length; i++) {
            let char = charstream[i];
            switch (char) {
                case "\'":
                    if (this.tokens[this.tokens.length-1].type !== TokenType.SINGLE_QUOTE && stack !== "") {
                        eat({type:TokenType.VALUE, value: stack});
                        stack = "";
                    }
                    if (stack === "\\") {
                        eat({type: TokenType.ESCAPED_SINGLE_QUOTE});
                    } else if (stack === "") {
                        eat({type: TokenType.SINGLE_QUOTE});
                    } else {
                        eat({type:TokenType.VALUE, value: stack});
                        stack = "";
                        eat({type:TokenType.SINGLE_QUOTE});
                    }
                case "\"":
                    if (this.tokens[this.tokens.length-1].type !== TokenType.DOUBLE_QUOTE && stack !== "") {
                        eat({type:TokenType.VALUE, value: stack});
                        stack = "";
                    }
                    if (stack === "\\") {
                        eat({type: TokenType.ESCAPED_DOUBLE_QUOTE});
                    } else if (stack === "") {
                        eat({type: TokenType.DOUBLE_QUOTE});
                    } else {
                        eat({type:TokenType.VALUE, value: stack});
                        stack = "";
                        eat({type:TokenType.DOUBLE_QUOTE});
                    }
                case " ":
                    eat({type:TokenType.VALUE, value: stack});
                    stack = "";
                    eat({type:TokenType.WHITESPACE});
                    break;
                case "\t":
                    eat({type:TokenType.VALUE, value: stack});
                    stack = "";
                    eat({type:TokenType.WHITESPACE});
                    break;
                case ";":
                    eat({type:TokenType.VALUE, value: stack});
                    stack = "";
                    eat({type:TokenType.SEMICOLON});
                    break;
                case "\n":
                    eat({type:TokenType.VALUE, value: stack});
                    stack = "";
                    eat({type:TokenType.LINE_FEED});
                    break;
                case "\r":
                    eat({type:TokenType.VALUE, value: stack});
                    stack = "";
                    eat({type:TokenType.CARRIAGE_RETURN});
                    break;
                case "\f":
                    eat({type:TokenType.VALUE, value: stack});
                    stack = "";
                    eat({type:TokenType.FORM_FEED});
                    break;
                case "-":
                    if (stack === "-") {
                        eat({type:TokenType.MATH_OPERATOR, value: "--"});
                        stack = ""
                    } else if (stack !== "-" && lookahead(i)!=="-") {
                        eat({type:TokenType.VALUE, value: stack});
                        stack = "";
                        if (lookahead(i)==="=") {
                            stack+=char;
                        } else {
                            eat({type:TokenType.MATH_OPERATOR, value: "-"});
                            stack = "";
                        }
                    }
                    break;
                case "+":
                    if (stack === "+") {
                        eat({type:TokenType.MATH_OPERATOR, value: "++"});
                        stack = ""
                    } else if (stack !== "+" && lookahead(i)!=="+") {
                        eat({type:TokenType.VALUE, value: stack});
                        stack = "";
                        if (lookahead(i)==="=") {
                            stack+=char;
                        } else {
                            eat({type:TokenType.MATH_OPERATOR, value: "+"});
                            stack = "";
                        }
                    }
                    break;
                case "*":
                    if (stack === "*") {
                        if (lookahead(i)==="=") {
                            eat({type:TokenType.ASSIGNMENT_OPERATOR, value: "**="});
                            stack = "";
                        } else {
                            eat({type:TokenType.ASSIGNMENT_OPERATOR, value: "**"});
                            stack = "";
                        }
                    } else if (stack === "/") {
                        eat({type:TokenType.MULTILINE_COMMENT_START});
                        stack = "";
                    } else if (stack !== "*" && lookahead(i)!=="*") {
                        eat({type:TokenType.VALUE, value: stack});
                        stack = "";
                        if (lookahead(i)==="=") {
                            eat({type:TokenType.ASSIGNMENT_OPERATOR, value: "*="});
                        } else if (lookahead(i)==="/") {
                            stack+=char;
                        } else {
                            eat({type:TokenType.MATH_OPERATOR, value: "*"});
                        }
                    }
                    break;
                case "|":
                    if (stack === "|") {
                        if (lookahead(i)==="=") {
                            stack+=char;
                        } else {
                            eat({type:TokenType.LOGICAL_OPERATOR, value: "||"});
                            stack = ""
                        }
                    } else if (stack !== "|" && lookahead(i)!=="|") {
                        eat({type:TokenType.VALUE, value: stack});
                        stack = "";
                        if (lookahead(i)==="=") {
                            stack+=char;
                        } else {
                            eat({type:TokenType.BITWISE_OPERATOR, value: "|"});
                        }
                    }
                    break;
                case "&":
                    if (stack === "&") {
                        eat({type:TokenType.LOGICAL_OPERATOR, value: "&&"});
                        stack = "";
                    } else if (stack !== "&" && lookahead(i)!=="&") {
                        eat({type:TokenType.VALUE, value: stack});
                        stack = "";
                        if (lookahead(i)==="=") {
                            stack+=char;
                        } else {
                            eat({type:TokenType.BITWISE_OPERATOR, value: "&"});
                        }
                    }
                    break;
                case ">":
                    if (stack === ">") {
                        if (lookahead(i)!==">") {
                            if (lookahead(i)==="=") {
                                stack+=char;
                            } else {
                                eat({type:TokenType.BITWISE_OPERATOR, value: ">>"});
                                stack = "";
                            }
                        } else {
                            stack+=char;
                        }
                    } else if (stack === ">>") {
                        if (lookahead(i)==="=") {
                            stack+=char;
                        } else {
                            eat({type:TokenType.BITWISE_OPERATOR, value: ">>>"});
                            stack = "";
                        }
                    } else if (stack === "=") {
                        eat({type:TokenType.ARROW_FUNCTION});
                        stack = "";
                    } else if ((stack !== ">" && stack !== "") && lookahead(i)!==">") {
                        eat({type:TokenType.VALUE, value: stack});
                        stack = "";
                        if (lookahead(i)==="=") {
                            stack+=char;
                        } else {
                            eat({type:TokenType.MATH_OPERATOR, value: ">"});
                            stack = "";
                        }
                    }
                    break;
                case "<":
                    if (stack === "<") {
                        if (lookahead(i)==="=") {
                            stack+=char;
                        } else {
                            eat({type:TokenType.BITWISE_OPERATOR, value: "<<"});
                        }
                        stack = "";
                    } else if (stack !== "<" && lookahead(i)!=="<") {
                        eat({type:TokenType.VALUE, value: stack});
                        stack = "";
                        if (lookahead(i)==="=") {
                            stack+=char;
                        } else {
                            eat({type:TokenType.MATH_OPERATOR, value: "<"});
                            stack = "";
                        }
                    }
                    break;
                case "/":
                    if (stack = "/") {
                        eat({type:TokenType.COMMENT});
                        stack = "";
                    } else if (stack.split("")[Math.max(stack.length-1, 0)] === "*") { 
                        eat({type:TokenType.MULTILINE_COMMENT_END});
                        stack="";
                    } else if (stack !== "/" && lookahead(i)!=="/") {
                        eat({type:TokenType.VALUE, value: stack});
                        stack = "";
                        if (lookahead(i)==="*" || lookahead(i)==="=") {
                            stack+=char;
                        }
                        eat({type:TokenType.MATH_OPERATOR, value:"/"});
                    }
                    break; 
                case "(":
                    eat({type:TokenType.VALUE, value: stack});
                    stack = "";
                    eat({type:TokenType.L_PAREN});
                    break;
                case ")":
                    eat({type:TokenType.VALUE, value: stack});
                    stack = "";
                    eat({type:TokenType.R_PAREN});
                    break;
                case "[":
                    eat({type:TokenType.VALUE, value: stack});
                    stack = "";
                    eat({type:TokenType.L_BRACKET});
                    break;
                case "]":
                    eat({type:TokenType.VALUE, value: stack});
                    stack = "";
                    eat({type:TokenType.R_BRACKET});
                    break;
                case "{":
                    eat({type:TokenType.VALUE, value: stack});
                    stack = "";
                    eat({type:TokenType.L_CURLY});
                    break;
                case "}":
                    eat({type:TokenType.VALUE, value: stack});
                    stack = "";
                    eat({type:TokenType.R_CURLY});
                    break;
                case "!":
                    eat({type:TokenType.VALUE, value: stack});
                    stack = "";
                    if (lookahead(i) === "=") {
                        stack+=char;
                    } else {
                        eat({type:TokenType.R_CURLY});
                    }
                    break;
                case "^":
                    eat({type:TokenType.VALUE, value: stack});
                    stack = "";
                    if (lookahead(i) === "=") {
                        stack+=char;
                    } else {
                        eat({type:TokenType.BITWISE_OPERATOR, value: "^"});
                    }
                    break;
                case "?":
                    if (stack = "?") {
                        if (lookahead(i) === "=") { 
                            stack+=char;
                        } else {
                            eat({type:TokenType.LOGICAL_OPERATOR, value: "??"});
                            stack = "";
                        }
                    } else if (stack = "" && lookahead(i) === "=") { 
                        stack+=char
                    } else {
                        eat({type:TokenType.VALUE, value: "?"});
                    }
                    break;
                case "=":
                    switch (stack) {
                        case "=":
                            if (lookahead(i)!=="=") {
                                eat({type:TokenType.COMPARISON_OPERATOR, value:"=="});
                            } else stack += char;
                            break;
                        case "==":
                            eat({type:TokenType.COMPARISON_OPERATOR, value:"==="});
                            break;
                        case "*":
                            eat({type:TokenType.ASSIGNMENT_OPERATOR, value:"*="});
                            break;
                        case "**":
                            eat({type:TokenType.ASSIGNMENT_OPERATOR, value:"**="});
                            break;
                        case "!":
                            if (lookahead(i)!=="=") {
                                eat({type:TokenType.COMPARISON_OPERATOR, value:"!="});
                            } else stack+=char;
                            break;
                        case "!=":
                            eat({type:TokenType.COMPARISON_OPERATOR, value:"!=="});
                            break;
                        case ">>":
                            eat({type:TokenType.ASSIGNMENT_OPERATOR, value:">>="});
                            break;
                        case "<<":
                            eat({type:TokenType.ASSIGNMENT_OPERATOR, value:"<<="});
                            break;
                        case ">>>":
                            eat({type:TokenType.ASSIGNMENT_OPERATOR, value:">>>="});
                            break;
                        case "+":
                            eat({type:TokenType.ASSIGNMENT_OPERATOR, value:"+="});
                            break;
                        case "-":
                            eat({type:TokenType.ASSIGNMENT_OPERATOR, value:"-="});
                            break;
                        case "/":
                            eat({type:TokenType.ASSIGNMENT_OPERATOR, value:"/="});
                            break;
                        case "%":
                            eat({type:TokenType.ASSIGNMENT_OPERATOR, value:"%="});
                            break;
                        case "??":
                            eat({type:TokenType.ASSIGNMENT_OPERATOR, value:"??="});
                            break;
                        case "|":
                            eat({type:TokenType.ASSIGNMENT_OPERATOR, value:"|="});
                            break;
                        case "||":
                            eat({type:TokenType.ASSIGNMENT_OPERATOR, value:"||="});
                            break;
                        case "^":
                            eat({type:TokenType.ASSIGNMENT_OPERATOR, value:"^="});
                            break;
                        default:
                            if (stack === "") {
                                if (lookahead(i)!=="=") {
                                    eat({type:TokenType.ASSIGNMENT_OPERATOR, value:"="});
                                } else stack += char;
                                break;
                            } else {
                                eat({type:TokenType.VALUE, value: stack});
                                stack = "";
                                if (lookahead(i)!=="=") {
                                    eat({type:TokenType.ASSIGNMENT_OPERATOR, value:"="});
                                } else stack += char;
                                break;
                            }
                    }
                    break;
                case ".":
                    eat({type:TokenType.VALUE, value: stack});
                    stack = "";
                    eat({type:TokenType.DOT});
                    break;
                case ":":
                    eat({type:TokenType.VALUE, value: stack});
                    stack = "";
                    eat({type:TokenType.VALUE, value:":"});
                    break;
                case "`":
                    if (this.tokens[this.tokens.length-1].type !== TokenType.TEMPLATE_LITERAL && stack !== "") {
                        eat({type:TokenType.VALUE, value: stack});
                        stack = "";
                    }
                    if (stack === "") {
                        eat({type: TokenType.TEMPLATE_LITERAL});
                    } else {
                        eat({type:TokenType.VALUE, value: stack});
                        stack = "";
                        eat({type:TokenType.TEMPLATE_LITERAL});
                    }
                    break;
                case "$":
                    eat({type:TokenType.VALUE, value: "$"});
                    break;
                case ",":
                    eat({type:TokenType.VALUE, value: stack});
                    stack = "";
                    eat({type:TokenType.COMMA});
                    break;
                case "~":
                    eat({type:TokenType.VALUE, value: stack});
                    stack = "";
                    eat({type:TokenType.BITWISE_OPERATOR, value: "~"});
                    break;
                case "%":
                    eat({type:TokenType.VALUE, value: stack});
                    stack = "";
                    if (lookahead(i)==="=") {
                        stack+=char
                    } else {
                        eat({type:TokenType.MATH_OPERATOR, value: "%"});
                    }
                    break;
                default:
                    stack+=char;
                    break;
            }
        }
    }


    public static preprocessor() {
        let lookahead = (n:number) => this.tokens[n+1];
        for (let i = 0; i<this.tokens.length; i++) {
            if (this.tokens[i].type === TokenType.DOUBLE_QUOTE) {
                let out = this.crawl(i, TokenType.DOUBLE_QUOTE);
                let length = out[0];
                this.tokens.splice(i+1, length);
                this.tokens[i] = {type: TokenType.STRING, value: out[1]}
            } else if (this.tokens[i].type === TokenType.SINGLE_QUOTE) {
                let out = this.crawl(i, TokenType.SINGLE_QUOTE);
                let length = out[0];
                this.tokens.splice(i+1, length);
                this.tokens[i] = {type: TokenType.STRING, value: out[1]}
            } else if (this.tokens[i].type === TokenType.TEMPLATE_LITERAL) {
                let out = this.crawl(i, TokenType.TEMPLATE_LITERAL);
                let length = out[0];
                this.tokens.splice(i+1, length);
                this.tokens[i] = {type: TokenType.TEMPLATE_STRING, value: out[1]}
            } else if (this.tokens[i].type === TokenType.VALUE) {
                switch (this.tokens[i].value) {
                    case "if":
                        this.tokens[i] = {type:TokenType.IF};
                        break;
                    case "else":
                        if (lookahead(i).value === "if") {
                            this.tokens[i] = {type:TokenType.ELSE_IF};
                            this.tokens.splice(i+1, 1);
                        } else {
                            this.tokens[i] = {type:TokenType.ELSE};
                        }
                        break;
                    case "int":
                        this.tokens[i] = {type:TokenType.INT};
                        break;
                    case "break":
                        this.tokens[i] = {type: TokenType.BREAK};
                        break;
                    case "async":
                        this.tokens[i] = {type:TokenType.ASYNC};
                        break;
                    case "await":
                        this.tokens[i] = {type: TokenType.AWAIT};
                        break;
                    case "class":
                        this.tokens[i] = {type: TokenType.CLASS};
                        break;
                    case "true":
                        this.tokens[i] = {type: TokenType.BOOL, value:true};
                        break;
                    case "false":
                        this.tokens[i] = {type: TokenType.BOOL, value:false};
                        break;
                    case "string":
                        this.tokens[i] = {type: TokenType.VAR_STRING};
                        break;
                    case "bool":
                        this.tokens[i] = {type: TokenType.VAR_BOOL};
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
                case TokenType.FORM_FEED:
                    return "\f";
                case TokenType.LINE_FEED:
                    return "\n";
                case TokenType.CARRIAGE_RETURN:
                    return "\r";
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
