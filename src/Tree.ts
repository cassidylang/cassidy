enum nodeType {
    Class,
    Method,
    FControl,
    Namespace,
    Enum,
    Object,
    Global
}
const order: Array<nodeType> = [
    nodeType.Global, nodeType.Namespace, nodeType.Class, nodeType.Method
]
/**
 * Namespace/class/method in a tree-like structure
 */
class TreeNode {
    public nodeName: string;
    public nodeT: nodeType;
    public methods?: Array<TreeNode>;
    public namespace?: Array<TreeNode>;
    public class?: Array<TreeNode>;
    constructor(nodeVal: string, pType: nodeType, public method?:Array<TreeNode>, public c?:Array<TreeNode>, public n?:Array<TreeNode>) {
        this.nodeName = nodeVal;
        this.nodeT = pType;
        this.methods = method;
        this.class = c;
        this.namespace = n;
    }
}
 
class Helper {
    public static find(f_body: TreeNode, f_type: nodeType, f_target: TreeNode) {
        let output: TreeNode | undefined;
        if (order.findIndex(e => e === f_body.nodeT) <= order.findIndex(e => e === f_target.nodeT)) {
            console.error(`OrderError: ${f_target.nodeName} cannot contain ${f_body.nodeName}.`);
        }
        switch(f_type) {
            case nodeType.Method:
                if (f_body.methods !== undefined) {
                    output=f_body.methods?.find(e => e === f_target);
                } else if (f_body.methods === undefined || output === undefined) {
                    console.error(`SearchError : cannot find ${f_target.nodeName} within ${f_body.nodeName}.`);
                }
                break;
            case nodeType.Class:
                if (f_body.class !== undefined) {
                    output=f_body.class?.find(e => e === f_target);
                } else if (f_body.class === undefined || output === undefined) {
                    console.error(`SearchError : cannot find ${f_target.nodeName} within ${f_body.nodeName}.`);
                }
                break;
            case nodeType.Namespace:
                if (f_body.namespace !== undefined) {
                    output=f_body.namespace?.find(e => e === f_target);
                } else if (f_body.namespace === undefined || output === undefined) {
                    console.error(`SearchError : cannot find ${f_target.nodeName} within ${f_body.nodeName}.0`);
                }
                break;
        }
    }
}