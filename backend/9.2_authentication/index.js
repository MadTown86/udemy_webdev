import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;
const saltRounds = 10;


const db = new pg.Client({
  user: process.env.DB_POSTGREUSER,
  host: "localhost",
  database: "authentication",
  password: process.env.DB_POSTGREPASS,
  port: 5432,
});
db.connect();



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
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkEmail = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (checkEmail.rows.length > 0) {
      res.render("login.ejs", { message: "User already exists" });
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          const result = await db.query(
           "INSERT INTO users_with_salt (email, hash) VALUES ($1, $2)",
           [email, hash]
        );
        if (result) {
          res.render("register.ejs", { message: "User registered successfully" });
          console.log(result);
        } else {
          res.render("register.ejs", { message: "User registration failed" });
        }
      }
    }
        );
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const entered_password = req.body.password;

  try {
    const pullUserPassword = await db.query("SELECT * FROM users_with_salt WHERE email = $1", [email]);
    if (!pullUserPassword.rows.length) {
      res.render("login.ejs", { message: "Username Not Found" });
    } else {
      const user = pullUserPassword.rows[0];
      const password = user.hash;
      console.log("password: ", password);
      console.log("entered_password", entered_password)
      bcrypt.compare(entered_password, password, (err, result) => {
        if (err) {
          console.log(err);
        } else if (result) {
          res.render("secrets.ejs", { username: email });
        } else {
          res.render("login.ejs", { message: "Incorrect Password" });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
