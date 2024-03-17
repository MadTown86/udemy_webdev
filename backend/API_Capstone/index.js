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


app.post("/search", async (req, res) => {
    console.log(req.body);
    console.log(req.body.rating);
    if (req.body.rating != "blank") {
        switch (req.body.favcount) {
                case "False": 
                    try {
                        const response = await axios.get(`${baseUrl}/anime?filter[ageRating]=${req.body.rating}`, {
                        headers: defaultHeaders
                    })
                    res.render("index.ejs", { content: response.data });
                    break;
                    } catch (error) {
                        console.error(error);
                    }
                    
                    
                case "True":
                    try {
                        const response = await axios.get(`${baseUrl}/anime?filter[ageRating]=${req.body.rating}&sort=-favoritesCount`, {
                        headers: defaultHeaders
                    })
                    res.render("index.ejs", { content: response.data });
                    break;
                    } catch (error) {
                        console.error(error);
                    }

    }
    } else {
        try {
            const response = await axios.get(`${baseUrl}/anime?`, {
            headers: defaultHeaders
        })
        console.log(JSON.stringify(response.data));
        res.render("index.ejs", { content: response.data });
        } catch (error) {
            console.error(error);
        }
    }
});


app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});
