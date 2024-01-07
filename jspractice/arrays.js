function fzbz(end) {
    var count = 1
    while (count <= end) {
        if (count % 3 == 0 && count % 5 == 0) {
            console.log("FizzBuzz");
        } else if (count % 3 == 0) {
            console.log("Fizz");
        } else if (count % 5 == 0) {
            console.log("Buzz");
        } else {
            console.log(count);
        }
        count++;
    }
}

function randomNum (names) {
    var lenNames = names.length;
    var ranNum = Math.floor(Math.random()*lenNames);
    return names[ranNum]
}

console.log(randomNum(["one", "two", "three", "four", "five"]))