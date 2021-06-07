export class TypeCheck {
    constructor() {}
    public static check(base: Type, req: Type, line: number) {
        let state = base === req ? true : false;
        return state ? state : Constants.processDebuggerMessage(Err.Type, line, base, req);
    }
}