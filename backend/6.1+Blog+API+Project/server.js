import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
var time = Date.now();

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to render the main page
app.get("/", async (req, res) => {
  console.log("GET / from server.js  ::", Date.now());
  try {
    const response = await axios.get(`${API_URL}/posts`);  
    res.render("index.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Route to render the edit page
app.get("/new", (req, res) => {
  console.log("GET /NEW from server.js  ::", Date.now());
  res.render("modify.ejs", { heading: "New Post", submit: "Create Post" });
});

app.get("/edit/:id", async (req, res) => {
  console.log("GET /EDIT/:id from server.js  ::", Date.now());
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    console.log(`Edit Post Response \n ${'*' * 50} \n ${JSON.stringify(response.data)}`);
    res.render("modify.ejs", {
      heading: "Edit Post",
      submit: "Update Post",
      post: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
  res.redirect("/");
});

// Find a new post
app.get("/posts/:id", async (req, res) => {
  console.log("GET /POSTS/:id from server.js  ::", Date.now());
  try {
    if (!req.query.id) {
      const response = await axios.get(`${API_URL}/posts`);
      res.render("index.ejs", { posts: response.data });
    } else {
      const response = await axios.get(`${API_URL}/posts/${req.query.id}`);
      res.render("index.ejs", { posts: [response.data] })
    }
    
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
}
);

// Create a new post
app.post("/api/posts", async (req, res) => {
  console.log("POST /POSTS from server.js  ::", Date.now());
  try {
    const response = await axios.post(`${API_URL}/posts`, req.body);
    console.log(`Create Post Response \n ${'*' * 50} \n ${response.data}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// Partially update a post
app.post("/api/posts/:id", async (req, res) => {
  console.log("PATCH /POSTS/:id from server.js  ::", Date.now());
  console.log("called");
  console.log(req.params.id);
  try {
    const response = await axios.patch(
      `${API_URL}/posts/${req.params.id}`,
      req.body
    );
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});

// Delete a post
app.get("/api/posts/delete/:id", async (req, res) => {
  console.log("DELETE /POSTS/:id from server.js  ::", Date.now());
  try {
    await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
