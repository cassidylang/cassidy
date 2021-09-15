import { ASTNode, Empty, Literal } from "./AST";

export type ExpressionList = BinaryExpression[];
export type Child = BinaryExpression | Literal;
export class BinaryExpression extends ASTNode {
    constructor(
            public left:BinaryExpression,
            public op:TokenType,
            public right:BinaryExpression
        ) {
        super();
    }
}