import express from "express";
import bodyParser from "body-parser";
import pg from "pg";


let dbUser = process.env.DB_USER;
let dbPassword = process.env.DB_PASSWORD;

const app = express();
const port = 3000;

const db = new pg.Client({
  user: dbUser,
  password: dbPassword,
  host: "localhost",
  port: 5432,
  database: "postgres",
});

db.connect();


let countries = [];
let total = 0;
db.query("SELECT country_code FROM countries_visited;", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    res.rows.forEach((row) => {
      countries.push(row.country_code);
    });
    total = res.rowCount;
  } 
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  console.log(countries);
  console.log(total);
  res.render("index.ejs", { countries: countries, total: total });
});

app.post("/add", async (req, res) => {
  let country = req.body.country;
  let query = `INSERT INTO countries_visited (country_code) VALUES ('${country}');`;
  db.query(query, (err, res) => {
    if (err) {
      console.error("Error executing query", err.stack);
    }
  });
  res.redirect("/");
} );

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
