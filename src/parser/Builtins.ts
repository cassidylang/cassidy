class Builtins {
    public static builtInPrototypeFunction: Array<FunctionObj> = [
        // MathF
        {identifier: "even", returnType: ["boolean"], parameter:[{identifier:"input", type:["int"]}]},
        // ArrayF
        {identifier: "sum", returnType: ["int"], parameter:[{identifier:"input", type:["int[]"]}]},
        {identifier: "min", returnType: ["int"], parameter:[{identifier:"input", type:["int[]"]}]},
        {identifier: "max", returnType: ["int"], parameter:[{identifier:"input", type:["int[]"]}]},
        {identifier: "sort", returnType: ["int[]"], parameter:[{identifier:"input", type:["int[]"]}]},
    ];
    public static builtInOperatorFunction: Array<FunctionObj> = [
        {identifier: "mod", returnType: ["int"], parameter:[{identifier:"a", type:["int"]},{identifier:"a", type:["int"]}]}
    ];
}