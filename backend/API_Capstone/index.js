import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

const app = express();
const port = 3000;


app.use(express.static(__dirname + "\\public\\"));
app.use(bodyParser.urlencoded({ extended: true }));


const masterKey = "4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT";
const baseUrl = "https://kitsu.io/api/edge"
const defaultHeaders = {
    "Accept": "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json"
}



app.get("/", async (req, res) => {
  res.render("index.ejs");
}
);

// app.get("/search", (req, res) => {
//     console.log(req.body);
// //     if req.
// //   const response = await axios.get(`${baseUrl}/anime?filter[ageRating]=${query}`, {
// //     headers: defaultHeaders
// //   });
// //   res.json(response.data);
// });

app.post("/search", async (req, res) => {
    const query = req.body.search;
    console.log(query);
    const response = await axios.get(`${baseUrl}/anime?filter[ageRating]=${query}`, {
      headers: defaultHeaders
    });
    console.log(res.json(response.data));
    res.render("index.ejs", {content: response.data});
    }
    );
  
//3. GET a jokes by filtering on the joke type

//4. POST a new joke

//5. PUT a joke

//6. PATCH a joke

//7. DELETE Specific joke

//8. DELETE All jokes

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});
