class ErrorCheck {
    constructor() {}
    public static getInvalidNameError(identifier: TokenType | string, type: string) {
        console.error(`${identifier} is invalid for ${type} declaration`)
    }
}