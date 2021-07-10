type varType = string | number | boolean | BigInt;
type accessModifier = "immutable" | "public" | "private" | "static" | "protected" | "abstract";

interface Parameter {
    item: VariableDeclaration;
    isOptional: boolean;
}

interface Literal {
    value: varType;
}

interface ArrowFunction {
    param?: Parameter;
    body: Body;
    isSelfReturning: boolean;
}

interface VariableAssignment {
    var1: string;
    var2?: string;
    assignValue?: varType
}

class ASTNode {
    //Empty parent node type
    constructor(){}
}

class DataNode extends ASTNode {
    constructor(identifier: string, type: string, accessModifier: accessModifier[]) {
        super();
        this.identifier = identifier;
        this.type = type;
        this.accessModifier = accessModifier;
    }
    accessModifier: accessModifier[];
    type: string;
    identifier: string;
}

class VariableDeclaration extends DataNode {
    constructor(identifier: string, type: string, value: varType, accessModifier: accessModifier[], initializer: varType) {
        super(identifier, type, accessModifier);
        this.value = value;
        this.initializer = initializer;
    }
    initializer: varType;
    value: varType;
}

class Body extends ASTNode {
    constructor(components: Array<DataNode>) {
        super();
        this.components = components;
    }
    components: Array<DataNode>
}

class FunctionDeclaration extends DataNode {
    constructor(identifier: string, type: string, accessModifier: accessModifier[], params: Parameter[], body: Body) {
        super(identifier, type, accessModifier);
        this.params = params;
        this.body = body;
    }
    params: Parameter[];
    body: Body;
}