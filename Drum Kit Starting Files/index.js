document.addEventListener("keydown", keyPress);let wss = new Audio("./sounds/crash.mp3");

let ass = new Audio("./sounds/kick-bass.mp3");
let sss = new Audio("./sounds/snare.mp3");
let dss = new Audio("./sounds/tom-1.mp3");
let jss = new Audio("./sounds/tom-2.mp3");
let kss = new Audio("./sounds/tom-3.mp3");
let lss = new Audio("./sounds/tom-4.mp3");

var w = document.getElementById("w");
var a = document.getElementById("a");
var s = document.getElementById("s");
var d = document.getElementById("d");
var j = document.getElementById("j");
var k = document.getElementById("k");
var l = document.getElementById("l");


w.addEventListener("click", function () {wss.play() });

document.getElementById("a").addEventListener("click", function () {ass.play()});
document.getElementById("s").addEventListener("click", function () {sss.play()});
document.getElementById("d").addEventListener("click", function () {dss.play()});
document.getElementById("j").addEventListener("click", function () {jss.play()});
document.getElementById("k").addEventListener("click", function () {kss.play()});
document.getElementById("l").addEventListener("click", function () {lss.play()});

function keyPress(e) {
    if (e.key == "w") {
        wss.play();
    } 
    if (e.key == "a") {
        ass.play();
    } 
    
    if (e.key == "s") {
        sss.play();
    } 
    
    if (e.key == "d") {
        dss.play();
    } 
    
    if (e.key == "j") {
        jss.play();
    } 
    
    if (e.key == "k") {
        return kss.play();
    } 
    
    if (e.key == "l") {
        lss.play();
    }
}

