var gameStarted = false;
var gameLevel = 0;
var gameOver = false;
var gamePattern = [];
var userPosition = -1;
var gameLevels = {"0": 2, "1": 3, "2": 4, "3": 6, "4": 8}
var playerTurn = false;
var buttonColors = ["green", "red", "yellow", "blue"];
var randomColor = "";
var playerTurn = false;

// Visual mechanics of the game
$(document).on("keydown", function() {
    if (!gameStarted) {
        $("h1").text("Level " + gameLevel);
        gameStarted = true;
        setTimeout(nextSequence, 1000);
    }
});

$(".btn").on("click", function() {
    if (gameStarted && playerTurn) {
        colorId = this.id;
        checkAnswer(colorId);
    }
});

function animatePress(color) {
    $("#" + color).addClass("pressed");
        setTimeout(function() {
            $("#" + color).removeClass("pressed");
        }, 100); 
}

function clickNoise(color) {
    var audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
}

function computerPlay() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = buttonColors[randomNumber];
    return randomColor;
}

// Game mechanics
function checkAnswer(color) {
    userPosition++;
    if (userPosition === gamePattern.length-1 && gamePattern.length === gameLevels[gameLevel.toString()]) {
        clickNoise(color);
        animatePress(color);
        var audio = new Audio("./sounds/w_la.wav");
        audio.play();
        gameLevel++;
        $("h1").text("Level " + gameLevel);
        userPosition = -1;
        gamePattern = [];
        playerTurn = false;
        setTimeout(nextSequence, 3000);
    } else if (color != gamePattern[userPosition]) {
        $("h1").text("Game Over, Press Any Key to Restart");
        clickNoise("wrong");
        gameStarted = false;
        gameLevel = 0;
        gamePattern = [];
        userPosition = -1;
        playerTurn = false;
        return;
    } else if (userPosition !== gamePattern.length-1){
        console.log("correct");
        animatePress(color);
        clickNoise(color);
    } else if (userPosition === gamePattern.length-1){
        animatePress(color);
        clickNoise(color);
        userPosition = -1;
        playerTurn = false;
        setTimeout(nextSequence, 1000);
    }
}

function playSequence(i) {
    clickNoise(gamePattern[i]);
    animatePress(gamePattern[i]);
}

function nextSequence() {
    // Check if the player is done with the current level
    console.log("made it here"); 
    console.log(gamePattern.length);
    console.log(gameLevels[gameLevel.toString()]);
    gamePattern.push(computerPlay());
    for (var i = 0; i <= gamePattern.length-1; i++) {
        setTimeout(playSequence, 1000*i, i);
    };
    playerTurn = true;
}



