function randomNumber() {
    var num = Math.floor(Math.random()*6) + 1;
    console.log(num)
    var image1 = document.getElementById("dice1")

    console.log(num)

    if (num == 1) {
        image1.src = "./assets/images/dice1.png"
    } else if (num == 2) {
        image1.src = "./assets/images/dice2.png"
    } else if (num == 3) {
        image1.src = "./assets/images/dice3.png"
    } else if (num == 4) {
        image1.src = "./assets/images/dice4.png"
    } else if (num == 5) {
        image1.src = "./assets/images/dice5.png"
    } else {
        image1.src = "./assets/images/dice6.png"
    }
    
}