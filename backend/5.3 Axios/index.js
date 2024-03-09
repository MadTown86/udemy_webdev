import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    res.render("index.ejs", { data: response.data });
  } catch (error) {
    res.render("index.ejs", {
      error: error.message,
    });
  };
});

app.post("/", async (req, res) => {
  try {
    const request = await axios({
    method: 'get',
    url: '/filter',
    baseURL: 'https://bored-api.appbrewery.com',
    params: {type: req.body.type, participants: req.body.participants}
  });
  
  const result = request.data;
  var send_choice = result[Math.floor(Math.random()*result.length)];
  res.render("index.ejs", {data: send_choice});
  } catch (error) {
    res.render("index.ejs", {
      error: error.message,
    });
  };
  });

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
