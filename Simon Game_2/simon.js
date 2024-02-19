var gameStarted = false;
var gameLevel = 0;

document.addEventListener("keydown", function(event){
    if (!gameStarted){
        gameStarted = true;
        $("#level-title").text("Level " + gameLevel);
        nextSequence();
    }
}
);
    

$(".btn").on("click", function(){
    var userChosenColour = this.id;
    // userClickedPattern.push(userChosenColour);
    // playSound(userChosenColour);
    animatePress(userChosenColour);
    // checkAnswer(userClickedPattern.length-1);
    }
);

function updateHeader(level) {
    $("#level-title").text("Level " + level);
}

function animatePress(currentColour){
    console.log(currentColour);
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// function playSound(name){
//     var audio = new Audio("sounds/" + name + ".mp3");
//     audio.play();
// }