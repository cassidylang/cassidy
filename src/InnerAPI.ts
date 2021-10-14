interface Dictionary<T> {
    [K: string]: T;
}
let api: Dictionary<Dictionary<boolean>> = {};
api["console"]["log"] = true
class InnerAPI {
    public static checkAPI(parent: string, child: string) {
        return Boolean(api[parent][child]);
    }
}