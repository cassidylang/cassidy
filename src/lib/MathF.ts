export const MathF = {
    even: (num: number) => num % 2 === 0,
    odd: (num: number) => num % 2 !== 0,
    prime: (num: number) => {
        for (let i=2;i<=Math.ceil(num/2);i++){
            if (num % i == 0){
                return false;
            }
        }
        return true;
    },
    gcd: (a: number, b: number) => {
        a = Math.abs(a);
        b = Math.abs(b);
        if (b > a) {var temp = a; a = b; b = temp;}
        while (true) {
            if (b == 0) return a;
            a %= b;
            if (a == 0) return b;
            b %= a;
        }
    },
    lcm: (a: number, b: number) => a / MathF.gcd(a, b) * b,
    sqr: (num: number) => Math.pow(num, 2),
    tau: () => Math.PI*2,
    root: (num: number, rootLevel: number) => Math.pow(num, 1/rootLevel),
    hypotenuse: (a: number, b: number) => Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)),
    factorial: (n: number) => {
        let x = 1;
        if (n === 0) return 1;
        for (let i=1; i<=n; i++) x*=i;
        return x;
    },
    binomial: (p:number, n:number, k:number) => {
        let nk = MathF.factorial(n)/MathF.factorial(k)*MathF.factorial(n-k);
        return nk*Math.pow(p, k)*Math.pow(1-p, n-k);
    },
}
