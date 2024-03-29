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
  const response = await axios.get(`${baseUrl}/anime?`, {
    headers: defaultHeaders
  });
  res.render("index.ejs");
}
);


app.post("/search", async (req, res) => {
  console.log(req.body);
    var rating = req.body.rating;
    var sort = req.body.sort;
    var episodesort = req.body.episode_sort
    var status = req.body.status;
    var subtype = req.body.subtype;

    var get_message = `${baseUrl}/anime?`;
    var sub_message = [];
    var filtered = false;
    var sorted = false;

    try {

      if (rating != "") {
        filtered = true;
        sub_message.push(`filter[ageRating]=${rating}`);
      }

      if (status != "") {
        if (filtered == true) {
          sub_message.push(`filter[status]=${status}`);
        } else {
        filtered = true
        sub_message.push(`filter[status]=${status}`);
        }
      }

      if (subtype != "") {
        if (filtered == true) {
          sub_message.push(`filter[subtype]=${subtype}`);
        } else {
          filtered = true
          sub_message.push(`filter[subtype]=${subtype}`);
        }
      }

      if (sort != "False") {
        sorted = true;
        sub_message.push(`sort=${sort}`);
      }

      if (episodesort != "False") {
        if (sorted == true) {
          sub_message.push(`sort=${episodesort}`);
        } else {
          sorted = true;
          sub_message.push(`sort=${episodesort}`);
        }
      }

      get_message += sub_message.join("&");

      console.log(`This is the message sent with axios: ${get_message}`)
      let response = await axios.get(get_message, {
        headers: defaultHeaders
      });

      if (!response) {
        console.log("Crappy Crap")
      } else {
        res.render("index.ejs", {data: response.data.data});
        console.log(response.data.data[1])
        console.log(response.data.links)
      }
    
  } catch (error) {
    console.log(error);
  }

});



app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});
