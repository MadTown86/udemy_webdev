import express from "express";

const app = express();
const port = 3000;

app.use(function (req, res, next) {
    if (req.method === "POST") {
        console.log(`Req-body: ${req.body}`);
        res.sendStatus(201);
    } else if (req.method === "GET") {
        console.log(req.rawHeaders);
        console.log(`Req-body: ${req.body}`);
        console.log(`Request method: ${req.method}`);
        res.sendStatus(200);
    } else if (req.method === "PUT") {
        console.log(`Req-body: ${req.body}`);
        console.log(`Request method: ${req.method}`);
        res.sendStatus(200);
    } else if (req.method === "DELETE") {
        console.log(`Req-body: ${req.body}`);
        console.log(`Request method: ${req.method}`);
        res.sendStatus(200);
    }
    next();
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});