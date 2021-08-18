const MathAssociation = [
    {name: "l_paren", symbol: "("},
    {name: "expo", symbol: "**", association: "r"},
    {name: "rem", symbol: "%", association: "l"},
    {name: "mod", symbol: "mod", association: "l"},
    {name: "mult", symbol: "*", association: "l"},
    {name: "div", symbol: "/", association: "l"},
    {name: "add", symbol: "+", association: "l"},
    {name: "min", symbol: "-", association: "l"},
];
enum MathPrecedence {
    exp = 2,
    rem = 1,
    mod = 1, 
    mult = 1,
    div = 1,
    add = 0,
    min = 0,
    paren = -1
}

/** Converting infix expression to Reverse Polish Notation (RPN) and back
 * 
 */
class RPN {
    /**
     * Convert infix math expression to RPN using Dijkstra's shunting-yard algorithm
     * @param mathExpr Infix Math Expression
     * @returns RPN
     */
    public static toRPN(mathExpr: string): string {
        let rpnText: string[] = [],
            stream = mathExpr.split(""),
            stack: string[] = [],
            charStack = "";
        stream.forEach(e => {
            if (!isNaN(parseInt(e))) {
                charStack+=e;
            } else if (isNaN(parseInt(e))) {
                if (charStack !== "") {
                    rpnText.push(charStack);
                    charStack = "";
                }
                if (stack === [] && this.isOp(e)) {
                    stack.push(e);
                } else charStack += e;
            }
        });

        return rpnText.join("");
    }

    public static getAssociation(sym: string) {
        return MathAssociation.find(e => e.symbol === sym)?.association;
    }
    public static isOp(sym: string) {
        return MathAssociation.find(e => e.symbol === sym) ? true : false;
    }
}