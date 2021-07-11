export const MathF = {
    even: (num: number) => num % 2 === 0,
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
    factorial: (n: number) => {
        let x = 1;
        if (n === 0) return 1;
        for (let i=1; i<=n; i++) x*=i;
        return x;
    },
}
