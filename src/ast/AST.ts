import { BinaryExpression } from "./BinaryExpression";

type varType = "string" | "float" | "boolean" | "int" | "undefined";
type accessModifier = "immutable" | "public" | "private" | "static" | "protected" | "abstract";
type fixOperator = "++" | "--";
type operator = "+=" | "-=" | "*=" | "/=" | fixOperator;

interface Parameter {
    item: VariableDeclaration;
    isOptional: boolean;
}

interface Literal {
    value: varType;
}

export class Variable {
    constructor(identifier: string, accessModifier: accessModifier[], value: any) {
        this.identifier = identifier;
        this.accessModifier = accessModifier;
        this.value = value;
    }
    identifier: string;
    accessModifier: accessModifier[];
    value: any;
    type: varType = "undefined";
}

interface BinaryOperation {
    left: Variable | BinaryExpression | BinaryOperation;
    right: Variable | BinaryExpression | BinaryOperation;
}

interface UpdateExpression {
    variable: Variable;
    operator: operator;
    operatorValue?: varType;
}

interface VariableAssignment {
    var1: string;
    var2?: string;
    assignValue?: varType
}
export class ASTNode {
    //Empty parent node type
    constructor(){}
}

export class DataNode extends ASTNode {
    constructor(identifier: string, type: TokenType, accessModifier: accessModifier[]) {
        super();
        this.identifier = identifier;
        this.type = type;
        this.accessModifier = accessModifier;
    }
    accessModifier: accessModifier[];
    type: TokenType;
    identifier: string;
}

export class VariableDeclaration extends DataNode {
    constructor(identifier: string, type: TokenType, accessModifier: accessModifier[], right: Variable | any) {
        super(identifier, type, accessModifier);
        this.right = right;
    }
    right: Variable | any;
}

export class Empty extends ASTNode {
    constructor() {
        super();
    }
}

export class BodyBlock extends ASTNode {
    constructor(components: ASTNode[]) {
        super();
        this.components = components;
    }
    components: ASTNode[]
}

export class FunctionDeclaration extends DataNode {
    constructor(identifier: string, type: TokenType, accessModifier: accessModifier[], params: Parameter[], body: BodyBlock) {
        super(identifier, type, accessModifier);
        this.params = params;
        this.body = body;
    }
    params: Parameter[];
    body: BodyBlock;
}

export class WhileStatement extends ASTNode {
    constructor(binExpr: BinaryExpression, body: BodyBlock) {
        super();
        this.binExpr = binExpr;
        this.body = body;
    }
    binExpr: BinaryExpression
    body: BodyBlock;
}

export class ForStatement extends ASTNode {
    constructor(varDec: VariableAssignment,binExpr: BinaryExpression,update: UpdateExpression, body: BodyBlock) {
        super();
        this.binExpr = binExpr;
        this.varDec = varDec;
        this.update = update;
        this.body = body;
    }
    varDec: VariableAssignment;
    binExpr: BinaryExpression;
    update: UpdateExpression;
    body: BodyBlock;
}

export class IfStatement extends ASTNode {
    constructor(binExpr: BinaryExpression, body: BodyBlock, chain: IfStatement | ElseStatement) {
        super();
        this.binExpr = binExpr;
        this.body = body;
        this.chain = chain;
    }
    binExpr: BinaryExpression;
    body: BodyBlock;
    chain: IfStatement | ElseStatement
}

export class ElseStatement extends ASTNode {
    constructor(binExpr: BinaryExpression, body: BodyBlock) {
        super();
        this.binExpr = binExpr;
        this.body = body;
    }
    binExpr: BinaryExpression;
    body: BodyBlock;
}

export class FunctionCall extends ASTNode {
    constructor(identifier: string, inputParam: varType) {
        super();
        this.identifier = identifier;
        this.inputParam = inputParam;
    }
    identifier: string;
    inputParam: varType;
}

export class Program extends ASTNode {
    constructor(components: ASTNode[]) {
        super();
        this.components = components;
    }
    components: ASTNode[];
}

export class ArrowFunction extends DataNode {
    constructor(identifier: string, type: TokenType, accessModifier: accessModifier[], body: BodyBlock, isBlock: boolean, params?: Parameter[]) {
        super(identifier, type, accessModifier);
        this.params = params;
        this.body = body;
        this.isBlock = isBlock;
    }
    params: Parameter[] | undefined;
    body: BodyBlock;
    isBlock: boolean;
}

