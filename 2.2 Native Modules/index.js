const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


async function userInput() {
    rl.question("What do you want to write to the file? ", (answer) => {
        return answer;
    });
}

let content = await userInput();

function writeToFile(content) {
    if (content !== "") {
    fs.writeFile("example.txt", content, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("File has been created");
        });


    fs.readFile("example.txt", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data);
        });

}
}


