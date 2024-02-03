function diceeGame() {
    var plyr1 = document.getElementById("img1")
    var plyr2 = document.getElementById("img2")
    var winner = document.getElementById("winner")


    function diceRoll() {
        var res = Math.floor(Math.random()*6);
        console.log(res);
        return res
    }

    function updateImage() {
        var diceList = ["./images/dice1.png", "./images/dice2.png", "./images/dice3.png", 
        "./images/dice4.png", "./images/dice5.png", "./images/dice6.png"]
        var rollOne = diceRoll()
        var rollTwo = diceRoll()
        console.log("This is dice1: " + diceList[rollOne])
        console.log("This is dice2: " + diceList[rollTwo])
        plyr1.src = diceList[rollOne]
        plyr2.src = diceList[rollTwo]

        if (rollOne > rollTwo) {
            winner.innerHTML = "Player 1 Wins";
        } else if (rollOne < rollTwo) {
            winner.innerHTML = "Player 2 Wins";
        } else {
            winner.innerHTML = "Its A TIE!";
        }
    }

    updateImage()
    alert("Rolled The Dice")
}