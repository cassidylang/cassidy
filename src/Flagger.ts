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
            case 'num':
                type = Type.num;
                break;
            case 'bool':
                type = Type.bool;
                break;
            case 'null':
                type = Type.null;
                break;
            case 'string_array':
                type = Type.string_array;
                break;
            case 'num_array':
                type = Type.num_array;
                break;
            case 'bool_array':
                type = Type.bool_array;
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
        return JSON.stringify({ mem: [flag.varname, flag.vartype, flag.value] })
    }
    public static typeToString(type: Type): string {
        switch(type) {
            case Type.string:
                return 'string'
        }
        return 'null';
    }
}
