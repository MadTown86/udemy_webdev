import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";
import mysql2 from "mysql2";
dotenv.config();

const app = express();
const port = 5000;
const dbuser = process.env.DB_USERTEST;
const dbpassword = process.env.DB_PASSWORDTEST;
const dbname = "posts";

const pool = mysql2.createPool({
    connectionLimit : 10,
    host: "localhost",
    port: 3306,
    user: dbuser,
    password: dbpassword,
    database: dbname,
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/posts", async (req, res) => {
    console.log("GET /POSTS from app.js  ::", Date.now());
    try {
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query('SELECT * FROM posts', (err, rows) => {
                    console.log(rows);
                    res.json(rows);
                    connection.release();
                if (err) throw err;
                });
                console.log("Connected to database");
            });
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
    }
});

app.post("/posts", (req, res) => {
    console.log("POST /POSTS from app.js  ::", Date.now());
    try {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query('INSERT INTO posts SET ?', req.body, (err, rows) => {
                console.log(rows);
                res.json(rows);
                connection.release();
            if (err) throw err;
            });
            console.log("Connected to database");
        });
    } catch (error) {
        res.status(500).json({ message: "Error adding post" });
    }
});

app.listen(port, () => {
    console.log(`API is running on port ${port}`);
});


