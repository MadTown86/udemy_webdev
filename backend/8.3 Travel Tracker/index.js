import express from "express";
import bodyParser from "body-parser";
import pg from "pg";


let dbUser = process.env.DB_POSTGREUSER;
let dbPassword = process.env.DB_POSTGREPASS;

const app = express();
const port = 3000;

const db = new pg.Client({
  user: dbUser,
  password: dbPassword,
  host: "localhost",
  port: 5432,
  database: "udemy",
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

const db_client2 = new pg.Client({
  user: dbUser,
  password: dbPassword,
  host: "localhost",
  port: 5432,
  database: "udemy",
});

let country_code = "blah";
app.post("/add", async (req, res) => {
  let country = req.body.country;
  
  db_client2.connect();
  try {
    const query_results = await db_client2.query(`SELECT country_code FROM countries_by_code WHERE country_name LIKE ('${country}');`);
    console.log(query_results);
    country_code = query_results.rows[0].country_code;
    console.log(`Country code: ${country_code}`)
  } catch (err) {
    console.error("Error executing query", err.stack);
  }
  
  console.log(country_code);
  let query = `INSERT INTO countries_visited (country_code) VALUES ('${country_code}');`;
  db_client2.query(query, (err, res) => {
    if (err) {
      console.error("Error executing query", err.stack);
    }
    console.log(res);
  });
  total++;
  countries.push(country_code);
  console.log(countries);
  res.render("index.ejs", { countries: countries, total: total });
} );

db_client2.end();


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
