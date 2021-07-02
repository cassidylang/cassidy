enum Type {
    'int',
    'float',
    'bool',
    'string',
    'null'
}
enum SType {
    'array',
}
/**
 * Produce flags to be injected into the type memory for typing support
 */
class VariableFlag {
    constructor(
        public varname: string,
        public vartype: string,
        public value: any,
        public mutable: boolean,
        public isStatic: boolean,
        public secondaryType?: string,
    ) {
    }
}
class FlagController {
    constructor() {}
    public static produceMemoryFlag(flag: VariableFlag) {
        return JSON.stringify({ mem: [flag.varname, flag.vartype, flag.value, flag.secondaryType, flag.mutable, flag.isStatic]})
    }
}
