import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

let dbUser = process.env.DB_POSTGREUSER;
let dbPassword = process.env.DB_POSTGREPASS;

const db = new pg.Client({
  user: dbUser,
  host: "localhost",
  database: "udemy",
  password: dbPassword,
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET home page
app.get("/", async (req, res) => {
  const result = await db.query("SELECT country_code FROM countries_visited");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  console.log(result.rows);
  res.render("index.ejs", { countries: countries, total: countries.length });
  db.end();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});