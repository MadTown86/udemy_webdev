import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const { Client } = pg;
const client = new Client({
  user: process.env.DB_POSTGREUSER,
  host: "localhost",
  database: "authentication",
  password: process.env.DB_POSTGREPASS,
  port: 5432,
});

client.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  
  const checkResult = await client.query("SELECT * FROM users WHERE email=($1)", [req.body.username]);
  if (checkResult.rows.length > 0) {
    res.render("login.ejs", { message: "User already exists"})
  } else {
    const result = await client.query("INSERT INTO USERS (email, password) VALUES ($1, $2)", [req.body.username, req.body.password]);
    console.log(result);
    res.render("secrets.ejs", { message: "User registered successfully"});
  }
});

app.post("/login", async (req, res) => {
  const authenticateUser = await client.query("SELECT * FROM users WHERE email = $1", [req.body.username]);
  if (authenticateUser.rows.length > 0) {
    const user = authenticateUser.rows[0];
    const password = user.password;
    if (req.body.password === password) {
      res.render("secrets.ejs", { username: req.body.username });
    } else {      
      res.render("login.ejs", { message: "Incorrect Password" });
    }
  } else {
    res.render("login.ejs", { message: "Username Not Found" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
