class ErrorCheck {
    constructor() {}
    public static invalidNameError(identifier: TokenType | string, type: string) {
        console.error(`${identifier} is invalid for ${type} declaration`)
    }
}