import { ASTNode } from "./AST";

export type Expression = BinaryExpression | TernaryExpression | LogicalExpression | ComparisonExpression | Addition | Multiplication | Exponentiation | PreSuffix | Not;

export class BinaryExpression extends ASTNode {
    constructor() {
        super();
    }
}
export class TernaryExpression extends ASTNode {
    constructor() {
        super();
    }
}
export class LogicalExpression extends ASTNode {
    constructor() {
        super();
    }
}
export class ComparisonExpression extends ASTNode {
    constructor() {
        super();
    }
}
export class Addition extends ASTNode {
    constructor() {
        super();
    }
}
export class Multiplication extends ASTNode {
    constructor() {
        super();
    }
}
export class Exponentiation extends ASTNode {
    constructor() {
        super();
    }
}
export class PreSuffix extends ASTNode {
    constructor() {
        super();
    }
}
export class Not extends ASTNode {
    constructor() {
        super();
    }
}