import { ASTNode, Empty } from "./AST";

export type ExpressionList = Expression[];
export type Expression = TernaryExpression | LogicalExpression | ComparisonExpression | AddMin | MulDiv | Exponent | PreSuffix | Not | Empty;
export type AssignmentOperator = "=" | "/=" | "*=" | "+=" | "-=" | "**=" | "%=" | "%%=" | ">>=" | "<<=" | ">>>=" | "^=" | "&=" | "|=" | "??=" | "&&=" | "||=";
export type PreSuf = "--" | "++";
export type LogicalOperator = "||" | "&&" | "??";
export type NotOperator = "!" | "~";
export type AddMinOperator = "+" | "-";
export type MulDivOperator = "*" | "/";
export type BitwiseOperator = "|" | "^" | "&";
export type ComparisonOperator = "==" | "!=" | ">" | "<" | "<=" | ">=";
export type PrefixKeyword = TokenType.AWAIT | TokenType.NEW
export type InfixKeyword = TokenType.IN | TokenType.INSTANCEOF
export class AssignmentExpression extends ASTNode {
    constructor(
            public left:Expression,
            public op:AssignmentOperator,
            public right:Expression
        ) {
        super();
    }
}
export class TernaryExpression extends ASTNode {
    constructor(
            public condition:Expression,
            public caseTrue:Expression,
            public caseFalse:Expression
        ) {
        super();
    }
}
export class LogicalExpression extends ASTNode {
    constructor(
        public left:Expression,
        public op:LogicalOperator,
        public right:Expression
    ) {
        super();
    }
}
export class ComparisonExpression extends ASTNode {
    constructor(
        public left:Expression,
        public op:ComparisonOperator,
        public right:Expression
    ) {
        super();
    }
}
export class InfixKeywordExpression extends ASTNode {
    constructor(
        public left:Expression,
        public op:InfixKeyword,
        public right:Expression
    ) {
        super();
    }
}
export class AddMin extends ASTNode {
    constructor(
        public left:Expression,
        public op:AddMinOperator,
        public right:Expression
    ) {
        super();
    }
}
export class MulDiv extends ASTNode {
    constructor(
        public left:Expression,
        public op:MulDiv,
        public right:Expression
    ) {
        super();
    }
}
export class Exponent extends ASTNode {
    constructor(
        public left:Expression,
        public right:Expression
    ) {
        super();
    }
}
export class PrefixKeywordExpression extends ASTNode {
    constructor(
        public op:PrefixKeyword,
        public expr:Expression
    ) {
        super();
    }
}
export class PreSuffix extends ASTNode {
    constructor(
        public op:PreSuf,
        public expr:Expression
    ) {
        super();
    }
}
export class Not extends ASTNode {
    constructor(
        public op:NotOperator,
        public expr:Expression
    ) {
        super();
    }
}