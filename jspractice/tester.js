function test(names) {
    var lengthOf = names.length;
    var randomNum = Math.floor(Math.random() * lengthOf);
    console.log(names[randomNum])
    return randomNum
}

test(['mathew', 'mark', 'luke', 'john'])