enum Err {
    'Type',
    'Syntax',
    'Scope',
    'Infinite',
    'Overflow'
}
class Constants {
    /**
     * Bug Report => Bug Message
     */
    public static processDebuggerMessage(err: Err, line: number, base?: string, req?: string) {
        let arg = '', str = `${Err}Error : Line ${line}. ${arg}`
        switch (err) {
            case Err.Type:
                arg = `Expected ${req}, got ${base}`
                break;
            case Err.Syntax:
                arg = ''
                break;
        }
    }
}