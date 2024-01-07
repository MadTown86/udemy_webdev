function getMilk(money, cost) {
    console.log("all this other garbage text doesn't matter");
    var purchaseAmt =  Math.floor(money / cost)
    return console.log("YOUR ROBOT PURCHASED A FANTASTIC " + purchaseAmt + " Bottles of Milk On THE WALLLLLL")
}

getMilk(10, 2.1)

function lifeInWeeks(age = 10) {
    var left = 85-age;
    return console.log("You have " + left*365 + "days, " + left*12 + " months, " + left*52 + " weeks left to live.")
}

lifeInWeeks(37)