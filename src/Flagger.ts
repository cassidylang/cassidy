enum Type {
    num,
    bool,
    string,
    string_array,
    num_array,
    bool_array,
    null
}
class VariableFlag {
    constructor(
        public varname: string,
        public vartype: Type,
        public value: any,
    ) {
        this.vartype = vartype || VariableFlag.getType(value);
    }
    public static getType(v: any): Type {
        let type: Type = Type.null;
        switch ((typeof v).toString()) {
            case 'string':
                type = Type.string;
                break;
            default:
                break;
        }
        return type;
    }
}
class FlagController {
    constructor() {}
    public static produceMemoryFlag(flag: VariableFlag) {

    }
    typeToString(type: Type) {
        switch(type) {
            
        }
    }
}