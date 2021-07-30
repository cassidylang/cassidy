namespace Helper {
    /**
     * Search for known built-in libraries
     * @param lib Name of library
     */
    export function searchForLib(lib: string) {
        if (Constants.libname.find(e=>e.slice(2, e.length-2))) {
            return Constants.libname.find(e=>e.slice(2, e.length-2));
        }
    }
}