let ass = new Audio("./sounds/kick-bass.mp3");
let sss = new Audio("./sounds/snare.mp3");
let wss = new Audio("./sounds/crash.mp3");
let dss = new Audio("./sounds/tom-1.mp3");
let jss = new Audio("./sounds/tom-2.mp3");
let kss = new Audio("./sounds/tom-3.mp3");
let lss = new Audio("./sounds/tom-4.mp3");

var sounds = {"a": ass, "s": sss, "w": wss, "d": dss, "j": jss, "k": kss, "l": lss}

var numberofButtons = document.querySelectorAll(".drum").length;

for (var i = 0; i < numberofButtons; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function() {

    var buttonInnerHTML = this.innerHTML;

    makeSound(buttonInnerHTML);
    keyAnimation(buttonInnerHTML);
});

}

document.addEventListener("keypress", function(event) {
    makeSound(event.key);
    keyAnimation(event.key)
})


function makeSound(key) {
    if (key in sounds) {
        sounds[key].play();
    } else {
        pass;
    }
}

function keyAnimation(key) {
    console.log(key)
    var activeButton = document.querySelector("." + key);
    activeButton.classList.add("pressed");
    setTimeout(function() {
        activeButton.classList.remove("pressed");
    }, 100)
}

// function toRemove(activeButton) {
//     activeButton.classList.remove("pressed");
// }
