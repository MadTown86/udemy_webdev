import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let dbUser = process.env.DB_POSTGREUSER;
let dbPassword = process.env.DB_POSTGREPASS;

const { Pool } = pg;
const pool = new Pool({
    user: dbUser,
    password: dbPassword,
    host: "localhost",
    port: 5432,
    database: "permalist",
  });

const client = await pool.connect();

async function getTasks() {
  const result = await client.query("SELECT * FROM items;");
  return result.rows;
}


app.get("/", async (req, res) => {
  let items = await getTasks();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  const result = await client.query("INSERT INTO items (title) VALUES ($1);", [item]);
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const updatedItemTitle = req.body.updatedItemTitle;
  const updatedItemId = req.body.updatedItemId;
  const result = await client.query("UPDATE items SET title = $1 WHERE id = $2;", [updatedItemTitle, updatedItemId]);
  res.redirect("/");
});
  

app.post("/delete", async (req, res) => {
  const deletedItemId = req.body.deleteItemId;
  try {
    const result = await client.query("DELETE FROM items WHERE id = $1;", [deletedItemId]);
    res.redirect("/");
  } catch (err) {
    console.error("Error executing query", err);
  }
  
});
  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
