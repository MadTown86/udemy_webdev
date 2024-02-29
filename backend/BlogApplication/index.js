import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

const app = express();
const port = 3000;

let date = new Date();
let year = date.getFullYear();

app.use(express.static(__dirname + "\\public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { year: year });
    });


app.post("/submit", (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        text: req.body.text,
        year: year,
    };
    console.log(data);
    res.render("index.ejs", data)
    });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
