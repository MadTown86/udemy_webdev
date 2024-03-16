import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

const app = express();
const port = 3000;

const API_URL = "https://secrets-api.appbrewery.com";
const yourBearerToken = "6d4c2050-9c2b-4a25-9a27-4703047d0ac9";

app.use(express.static(__dirname + "\\public\\"));

app.get("/", async (req, res) => {
    try {
        let secret = await axios.get(API_URL + "/random", {
            headers: {
                Authorization: `Bearer ${yourBearerToken}`
        }})
        res.render("index.ejs", {secret: secret.data.secret, user: secret.data.username});
    } catch (error) {
        console.log(error);
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// HINTS:
// 1. Import express and axios

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
