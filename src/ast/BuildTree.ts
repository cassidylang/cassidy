import { BaseProgram, Variable } from "./AST";

class BuildTree {
    constructor(){};

    public static program: BaseProgram;

    public static buildGlobalVariable() {
        // Placeholder test var
        this.program.program.components.push(new Variable("test", ["public", "static"], 0));
    }
}