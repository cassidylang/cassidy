export let CMath = {
    even: num => num % 2 == 0,
    odd: num => num % 2 != 0,
    prime: num => {
        for (let i=2;i<num;i++){
            if (num % i == 0){
                return false;
            }
        }
        return true;
    },
    findPrimeNum: (a, b) => {
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
    perfect: num => {
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
    gcd: (a, b) => {
        let res=1;
	    for (let i=1;i<=a;i++){
		    if (a % i == 0 && b % i == 0){
			    res=i;
		    }
	    }
	    return res;
    },
    lcm: (a, b) => {
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
    sqr: (num) => Math.pow(num, 2),
}