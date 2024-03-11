import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

//TODO 1: Add your own bearer token from the previous lesson.
const yourBearerToken = "6d4c2050-9c2b-4a25-9a27-4703047d0ac9";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  try {
    const post = await axios({
      method: "post",
      url: "/secrets",
      baseURL: API_URL,
      data: {
        secret: req.body.secret,
        score: req.body.score,
      },
      headers: { Authorization: `Bearer ${yourBearerToken}` },
    });
    console.log(post.data)
    res.render("index.ejs", { content: JSON.stringify(post.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
  // TODO 2: Use axios to POST the data from req.body to the secrets api servers.
});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const put = await axios({
      method: "put",
      url: "/secrets/" + searchId,
      baseURL: API_URL,
      data: {
        secret: req.body.secret,
        score: req.body.score,
      },
      headers: { Authorization: `Bearer ${yourBearerToken}` },
    });
    res.render("index.ejs", { content: JSON.stringify(put.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
  // TODO 3: Use axios to PUT the data from req.body to the secrets api servers.
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const patch = await axios({
      method: "patch",
      url: "/secrets/" + searchId,
      baseURL: API_URL,
      data: {
        secret: req.body.secret,
        score: req.body.score,
      },
      headers: { Authorization: `Bearer ${yourBearerToken}` },
    });
    res.render("index.ejs", { content: JSON.stringify(patch.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
  // TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const del = await axios({
      method: "delete",
      url: "/secrets/" + searchId,
      baseURL: API_URL,
      headers: { Authorization: `Bearer ${yourBearerToken}` },
    });
    res.render("index.ejs", { content: JSON.stringify(del.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
  // TODO 5: Use axios to DELETE the item with searchId from the secrets api servers.
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
