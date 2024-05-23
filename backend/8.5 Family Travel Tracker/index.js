import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

let dbUser = process.env.DB_POSTGREUSER;
let dbPassword = process.env.DB_POSTGREPASS;

const { Pool } = pg;
const pool = new Pool({
    user: dbUser,
    password: dbPassword,
    host: "localhost",
    port: 5432,
    database: "udemy",
  });

const client = await pool.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [];

async function checkVisited() {
  const result = await client.query("SELECT country_code FROM countries_visited JOIN users ON users.id = user_id WHERE user_id = $1;", [currentUserId]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function getUsers() {
  const result = await client.query("SELECT * FROM users;");
  users = result.rows;
  return users.find((user) => user.id == currentUserId);
}

app.get("/", async (req, res) => {
  const countries = await checkVisited();
  const currentUser = await getUsers();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUser.color,
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await client.query(
      "SELECT country_code FROM countries_by_code WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await client.query(
        "INSERT INTO countries_visited (user_id, country_code) VALUES ($1, $2)",
        [currentUserId, countryCode]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/user", async (req, res) => {
  if (req.body["add"] === "new") {
    res.render("new.ejs", {});
    return;
  } else {
    currentUserId = parseInt(req.body["user"]);
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  console.log(req.body);
  const result = await client.query("INSERT INTO users (name, color) VALUES ($1, $2) RETURNING id;", [req.body.name, req.body.color]);
  const id = result.rows[0].id;
  currentUserId = id;
  res.redirect("/");

  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
