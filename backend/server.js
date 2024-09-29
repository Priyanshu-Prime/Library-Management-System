const express = require('express');
const pg = require('pg');
const app = express();
const dotenv = require('dotenv');
const dbpool = require("./config/db");
const cors = require("cors");
const bookRoutes = require("./routes/bookroutes");

dotenv.config();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;

app.use(express.urlencoded({extended: true}));

app.listen(port, ()=>
{
    console.log(`Server is running on port ${port}`);
});

app.use("/api", bookRoutes);