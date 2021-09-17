import { ASTNode, Empty, Identifier, Literal } from "./AST";

export type ExpressionList = BinaryExpression[];
export type Child = BinaryExpression | Literal;
export class BinaryExpression extends ASTNode {
    constructor(
            public left:BinaryExpression | Literal | Identifier,
            public op:TokenType,
            public right:BinaryExpression | Literal | Identifier
        ) {
        super();
    }
}