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
    var rating = req.body.rating;
    var sort = req.body.sort;
    var episodesort = req.body.episodesort
    try {
    if (episodesort === "False") {
    switch(sort) {
      case "True":
        switch(rating) {
          case "G":
            var response = await axios.get(`${baseUrl}/anime?filter[ageRating]=G&sort=-favoritesCount`, {});
            res.render("index.ejs", {content: response.data.data});
            break;
          case "PG":
            var response = await axios.get(`${baseUrl}/anime?filter[ageRating]=PG&sort=-favoritesCount`, {});
            res.render("index.ejs", {content: response.data.data});
            break;
          case "R":
            var response = await axios.get(`${baseUrl}/anime?filter[ageRating]=R&sort=-favoritesCount`, {});
            res.render("index.ejs", {content: response.data.data});
            break;
          case "R18":
            var response = await axios.get(`${baseUrl}/anime?filter[ageRating]=R18&sort=-favoritesCount`, {});
            res.render("index.ejs", {content: response.data.data});
            break;
          default:
            var response = await axios.get(`${baseUrl}/anime?sort=-favoritesCount`, {});
            res.render("index.ejs", {content: response.data.data});
            break;
        } 
        break;
      case "False":
        switch(rating) {
          case "G":
            var response = await axios.get(`${baseUrl}/anime?filter[ageRating]=G`, {});
            res.render("index.ejs", {content: response.data.data});
            break;
          case "PG":
            var response = await axios.get(`${baseUrl}/anime?filter[ageRating]=PG`, {});
            res.render("index.ejs", {content: response.data.data});
            break;
          case "R":
            var response = await axios.get(`${baseUrl}/anime?filter[ageRating]=R`, {});
            res.render("index.ejs", {content: response.data.data});
            break;
          case "R18":
            var response = await axios.get(`${baseUrl}/anime?filter[ageRating]=R18`, {});
            res.render("index.ejs", {content: response.data.data});
            break;
          default:
            var response = await axios.get(`${baseUrl}/anime?`, {});
            res.render("index.ejs", {content: response.data.data});
            break;
        }
        break;
      default:
        var response = await axios.get(`${baseUrl}/anime?`, {});
        res.render("index.ejs", {content: response.data.data});
        break;
    }} else {
      var response = await axios.get(`${baseUrl}/anime?sort=-episodeCount`, {});
      res.render("index.ejs", {content: response.data.data});
    }
  } catch (error) {
    console.log(error);
  }
});


app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});
