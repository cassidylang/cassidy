export class ASTNode {

}

export class Empty extends ASTNode {
    constructor(){super()};
}
export type Statement = FunctionDeclaration | VariableDeclaration | Empty;
export class VariableDeclaration extends ASTNode {
    constructor(
        public identifier: string,
        public type: string,
        public value?: any
    ){super()};
}
export class FunctionDeclaration extends ASTNode {
    constructor(
        public identifier: string,
        public parameters: VariableDeclaration[],
        public body: Statement[]
    ){super()};
}
export class Body extends ASTNode {
    constructor(
        public statements: Statement[]
    ) {super()}
}