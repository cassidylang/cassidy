class Main {
    public static mArray: Array<TreeNode> = [];
    public static cArray: Array<TreeNode> = [];
    public static nArray: Array<TreeNode> = [];
    //always last line
    /**
     * Global scope item
     */
    public static root = new TreeNode('global', nodeType.Global, undefined, undefined, Main.nArray);
}