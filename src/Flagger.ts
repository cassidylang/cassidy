enum Type {
    'num',
    'bool',
    'string',
    'null'
}
enum SType {
    'array',
    'method'
}
class VariableFlag {
    constructor(
        public varname: string,
        public vartype: Type,
        public value: any,
        public secondaryType?: SType,
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
}
