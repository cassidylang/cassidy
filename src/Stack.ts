interface VarObj {
    identifier: string;
    type: TokenType | string;
    value: string;
}
interface Param {
    identifier: string;
    type: string | TokenType;
    baseValue?: string;
}
interface FunctionObj {
    identifier: string;
    returnType: string[];
    parameter: Param[];
}
class Stack {
    public static functionStack: FunctionObj[] = [];
    public static variableStack: VarObj[] = [];
}