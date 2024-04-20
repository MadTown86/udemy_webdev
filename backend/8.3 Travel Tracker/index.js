import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

// DB LOGIN ELEMENTS
let dbUser = process.env.DB_POSTGREUSER;
let dbPassword = process.env.DB_POSTGREPASS;

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const { Pool } = pg;
const pool = new Pool({
    user: dbUser,
    password: dbPassword,
    host: "localhost",
    port: 5432,
    database: "udemy",
  });

const client = await pool.connect();

app.get("/", async (req, res) => {
  const result = await client.query("SELECT country_code FROM countries_visited;");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  console.log(result.rows);
  res.render("index.ejs", { countries: countries, total: countries.length });
}
);

app.post("/add", async (req, res) => {
  let client_text = req.body.country;
  const result = await client.query(`SELECT * FROM countries_by_code WHERE SIMILARITY(country_name, '${client_text}' || '%') > 0.5;`);
  if (result.rows.length> 1) {
    console.log("Multiple countries found");
  } else if (result.rows.length === 0) {
    console.log("Country not found");
  } else {
    console.log("Country found");
    let country_code = result.rows[0].country_code;
    console.log(country_code);
    await client.query(`INSERT INTO countries_visited (country_code) VALUES ('${country_code}');`);
  }
  res.redirect("/");
});
  


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
