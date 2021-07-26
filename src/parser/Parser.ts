import { createDeflateRaw } from "zlib";

class Parser {
    constructor() {}
    tokens = Lexer.tokens;
    /**
     * Preprocess the tokens
     * Basic bundling. Zero string interpolation + template stuffs
     */
    preprocessor() {
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
                }
            }
        }
    }

    crawl(start: number, type: TokenType): [number, string] {
        let crawling = true, output = "", index = start;
        while(crawling === true) {
            if (this.tokens[index+1].type !== type) {
                output+=this.getTokenRaw(this.tokens[index+1]);
                index++;
            } else {
                crawling = false;
            }
        }
        return [index+1, output];
    }

    getTokenRaw(token:Token) {
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