export enum ErrorCode {
    TypeError = 1000,
    Reserved,
    SyntaxError
}
interface ErrorForm {
    name: string,
    col: number,
    line: number
}
export class ErrorC {
    public static throwErr(code: ErrorCode, form: ErrorForm) {
        console.log("Err "+code)
    }
}