function fibo(num) {
    if (num == 1) {
        return [0]
    } else if (num == 2) {
        return [0, 1]
    } else {
        var res = [0, 1]
        for (i=num-2; i > 0; i--) {
            res.push(res[res.length-2] + res[res.length-1]);
        }
        return res
    }    
}

console.log(fibo(5));