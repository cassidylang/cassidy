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
}
