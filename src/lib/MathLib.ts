export const CMath = {
    even: (num: number) => num % 2 == 0,
    odd: (num: number) => num % 2 != 0,
    prime: (num: number) => {
        for (let i=2;i<=Math.ceil(num/2);i++){
            if (num % i == 0){
                return false;
            }
        }
        return true;
    },
    findPrimeNum: (a: number, b: number) => {
        let arr=[], check;
        for (let i=a;i<=b;i++){
            check=true;
            for (let j=2;j<i;j++){
                if (i % j == 0){
                    check=false;
                }
            }
            if (check != false && i > 2){
                arr.push(i)
            }
        }
        return arr;
    },
    perfect: (num: number) => {
        let sum=0;
        for (let i=1;i<num;i++){
            if (num % i == 0 && num != i){
                sum+=i;
            }
        }
        if (sum == num){
            return true;
        } else {
            return false;
        }
    },
    gcd: (a: number, b: number) => {
        let res=1;
        for (let i=1;i<=a;i++){
            if (a % i == 0 && b % i == 0){
                res=i;
            }
        }
        return res;
    },
    lcm: (a: number, b: number) => {
        let res=0, k=1;
        while (true){
            if (k % a == 0 && k % b == 0){
                res=k;
                break;
            }
            k++;
        }
        return res;
    },
    sqr: (num: number) => Math.pow(num, 2),
    tau: Math.PI*2,
    root: (num: number, rootLevel: number) => Math.pow(num, 1/rootLevel),
    hypotenuse: (a: number, b: number) => Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)),
    factorial: (n: number) => {
        let x=1;
        if (n===0) return 1;
        for (let i=1; i<=n; i++) x*=i;
        return x;
    },
    binomial: (p:number, n:number, k:number) => {
        let nk = CMath.factorial(n)/CMath.factorial(k)*CMath.factorial(n-k);
        return nk*Math.pow(p, k)*Math.pow(1-p, n-k);
    },

}
