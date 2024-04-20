import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';

let dbUser = process.env.DB_POSTGREUSER;
let dbPassword = process.env.DB_POSTGREPASS;

let db = new pg.Client({
    user: dbUser,
    password: dbPassword,
    host: 'localhost',
    port: 5432,
    database: 'udemy'
    });

try {
    db.connect();
    console.log('Connected to the database', db.database);
} catch (err) {
    console.error('Error connecting to the database', err.stack);
}

let countries = [];
let query = `SELECT country_code FROM countries_by_code WHERE (similarity(country_name, 'Uni%') > .1);`;
const response = await db.query(`SELECT * FROM countries_by_code WHERE SIMILARITY(country_name, 'United S');`, (err, res) => {
    if (err) {
        console.error('Error executing query', err.stack);
    } else {
        console.log(res);
    }
    console.log(countries);
} );

