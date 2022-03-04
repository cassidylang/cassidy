import { TokenType } from "./Lexer";

export class ASTNode {}
export class Program extends ASTNode {
    constructor(
        public statements: Statement[]
    ) {super()}
}
export class Empty extends ASTNode {
    constructor(){super()};
}
export type Statement = FunctionDeclaration | VariableDeclaration | Empty | ReferenceCall | Return;
export type ReferenceCall = FunctionCall | ObjectReference | Access | Empty;
export class VariableDeclaration extends ASTNode {
    constructor(
        public identifier: string,
        public type: TokenType,
        public value?: any
    ){super()};
}
export class FunctionDeclaration extends ASTNode {
    constructor(
        public identifier: string,
        public parameters: VariableDeclaration[],
        public body: Body,
        public type: TokenType
    ){super()};
}
export class Body extends ASTNode {
    constructor(
        public statements: Statement[]
    ) {super()}
}

export class PackedDeclaration extends ASTNode {
    constructor(
        public declaration: VariableDeclaration[]
    ) {super()}
}

export class Access extends ASTNode {
    constructor(
        public left: ReferenceCall,
        public right: ReferenceCall
    ) {super()}
}

export class FunctionCall extends ASTNode {
    constructor(
        public identifier: string,
        public args: any[]
    ) {super()}
}


export class ObjectReference extends ASTNode {
    constructor(
        public identifier: string
    ) {super()}
}
export class Return extends ASTNode {
    constructor(
        public value: any
    ) {super()}
}