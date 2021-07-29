"use strict";
exports.__esModule = true;
exports.MathF = void 0;
exports.MathF = {
    even: function (num) { return num % 2 === 0; },
    gcd: function (a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        if (b > a) {
            var temp = a;
            a = b;
            b = temp;
        }
        while (true) {
            if (b == 0)
                return a;
            a %= b;
            if (a == 0)
                return b;
            b %= a;
        }
    },
    lcm: function (a, b) { return a / exports.MathF.gcd(a, b) * b; },
    sqr: function (num) { return Math.pow(num, 2); },
    tau: function () { return Math.PI * 2; },
    root: function (num, rootLevel) { return Math.pow(num, 1 / rootLevel); },
    factorial: function (n) {
        var x = 1;
        if (n === 0)
            return 1;
        for (var i = 1; i <= n; i++)
            x *= i;
        return x;
    }
};
