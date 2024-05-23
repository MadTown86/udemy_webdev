import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import mysql2 from "mysql2";
import dotenv from "dotenv";

const app = express();
const port = 4000;
const API_URL = "http://localhost:5000";

// In-memory data store

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//

//CHALLENGE 1: GET All posts
app.get("/posts", async (req, res) => {
  console.log("GET /POSTS from index.js  ::", Date.now())
  const posts = await axios.get(`${API_URL}/posts`);
  console.log(posts.data);
  res.json(posts.data);
}
);


//CHALLENGE 2: GET a specific post by id
app.get("/posts/:id", async (req, res) => {
  console.log("GET /POSTS/:id from index.js  ::", Date.now())
  console.log(req.params.id);
  if (!req.params.id) {
    res.json(posts);
  } else {
      const postId = parseInt(req.params.id);
      const posts = await axios.get(`${API_URL}/posts`);
    const post = posts.find((post) => post.id === postId);
    console.log(post);
    if (post) {
      res.json(post);
    } else {
      res.status(404).send("Post not found");
    }
  }
}
);

//CHALLENGE 3: POST a new post
app.post("/posts", (req, res) => {
  console.log("POST /POSTS from index.js  ::", Date.now())
  const newPost = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  }
  const response = axios.post(`${API_URL}/posts`, newPost);
  console.log(response.data)
  res.json(response.data);
}
);

//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  console.log("PATCH /POSTS/:id from index.js  ::", Date.now())
  console.log(req.params.id)
  console.log(req.body.title)
  console.log(req.body.content)
  console.log(req.body.author)
  const postId = parseInt(req.params.id);
  const post = posts.find((post) => post.id === postId);
  const postIndex = posts.findIndex((post) => post.id === postId);
  if (post) {
    post.title = req.body.title;
    post.content = req.body.content;
    post.author = req.body.author;
    post.date = new Date().toISOString();
    posts[postIndex] = post;
    res.json(post);
  } else {
    res.status(404).send("Post not found");
  }
}
);

//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
  console.log("DELETE /POSTS/:id from index.js  ::", Date.now())
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === postId);
  if (postIndex !== -1) {
    posts.splice(postIndex, 1);
    res.send("Post deleted successfully");
  } else {
    res.status(404).send("Post not found");
  }
}
);

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
