

type varType = "string" | "float" | "boolean" | "int" | "undefined";

interface Parameter {
    item: VariableDeclaration;
    isOptional: boolean;
}

export class Literal {
    constructor
    (
        public value: any
    ){}
}

export class Variable {
    constructor(identifier: string, value: any) {
        this.identifier = identifier;
        this.value = value;
    }
    identifier: string;
    value: any;
    type: varType = "undefined";
}
export class ASTNode {
    //Empty parent node type
    constructor(){}
}

export class DataNode extends ASTNode {
    constructor(identifier: string, type: TokenType) {
        super();
        this.identifier = identifier;
        this.type = type;
    }
    type: TokenType;
    identifier: string;
}
export class VariableDeclaration extends DataNode {
    constructor(identifier: string, type: TokenType, right: Literal | Empty) {
        super(identifier, type);
        this.right = right;
    }
    right: Literal | Empty;
}
export class Empty extends ASTNode {
    constructor() {
        super();
    }
}
export class Program extends ASTNode {
    constructor(
        public components: ASTNode[]
    ) {
        super();
    }
}
export class FunctionDeclaration extends DataNode {
    constructor(
        identifier: string, 
        type: TokenType, 
        public body: any) {
        super(identifier, type);
    }
}

export class Statement extends ASTNode {
    constructor() {
        super();
    }
}
export class ProtoFunction extends Statement {
    constructor(
        public caller: string, 
        public callee: string, 
        public parameter: any[]
    ) {
        super();
    }
    public isInnerAPI: boolean = false;
    public isInnerAPICheck(): void {
        if (InnerAPI.checkAPI(this.caller, this.callee)) {
            this.isInnerAPI = true;
        }
    }
}