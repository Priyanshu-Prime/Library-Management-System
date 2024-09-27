const express = require('express');
const pg = require('pg');
const app = express();
const dotenv = require('dotenv');
const dbpool = require("./config/db");

dotenv.config();

const port = 8080;

app.listen(port, ()=>
{
    console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) =>
{
    res.send("Home directory");
});