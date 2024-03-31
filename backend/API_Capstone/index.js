import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
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
    var episodesort = req.body.episode_sort
    var status = req.body.status;
    var subtype = req.body.subtype;

    var get_message = `${baseUrl}/anime?`;
    var sub_message = [];
    const file_location = `D:\\DEVELOPER_FILES\\REPOSITORIES\\udemy_webdev\\udemy_webdev\\backend\\API_Capstone\\sampletext.txt`;

    try {
      if (rating != "") {
        sub_message.push(`filter[ageRating]=${rating}`);
      }
      if (status != "") {
        sub_message.push(`filter[status]=${status}`);
      }
      if (subtype != "") {
        sub_message.push(`filter[subtype]=${subtype}`);
      }
      if (sort == "True") {
        sub_message.push(`sort=${sort}`);
      }

      if (episodesort == "True" && sort == "False") {
        sub_message.push(`sort=${episodesort}`);
      }
        get_message += sub_message.join("&");
        console.log(get_message);
        const response = await axios.get(get_message, {
        headers: defaultHeaders
      })
        console.log(response.data.data[1]);
        console.log(response.data.links);
        var myJson = JSON.stringify(response.data,null,2);
        console.log(myJson);
        fs.writeFile("sampletext.json", myJson, function(err) {
        if (err) {
        console.log(err);
        }
        });
        res.render("index.ejs", { content: response.data.data, links: response.data.links });
    
  } catch (error) {
      console.log(error);
  }
});



app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});
