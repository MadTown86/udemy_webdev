$("h1").css("color", "red"); // This is jquery that selects the h1 tag and changes the color to red
$("h1").addClass("colorit"); // This is jquery that adds a class to the h1 tag called colorit
$("h1").removeClass("colorit"); // This is jquery that removes a class from the h1
$("h1").toggleClass("colorit"); // This is jquery that toggles the class on and off
$("h1").text("Bye"); // This is jquery that changes the text of the h1 to "Bye"
$("h1").html("<em>Bye</em>"); // This is jquery that changes the text of the h1 to "Bye" and makes it italic
$("h1").attr("class"); // This is jquery that gets the class of the h1
$("h1").attr("class", "colorit"); // This is jquery that sets the class of the h1 to colorit
$("h1").hasClass("colorit"); // This is jquery that checks if the h1 has the class colorit
$("h1").click(function() { // This is jquery that adds a click event to the h1
  $("h1").css("color", "purple");
});
$("h1").keypress(function(event) {
    console.log(event.key);
})// This is jquery that adds a keypress event to the h1

$("h1").on("mouseover", function() {
  $("h1").css("color", "purple");
}); // This is jquery that adds a mouseover event to the h1

$("h1").before("<button>New</button>"); // This is jquery that adds a button before the h1
$("h1").after("<button>New</button>"); // This is jquery that adds a button after the h1
$("h1").prepend("<button>New</button>"); // This is jquery that adds a button inside the h1 before the text
$("h1").append("<button>New</button>"); // This is jquery that adds a button inside the h1 after the text
