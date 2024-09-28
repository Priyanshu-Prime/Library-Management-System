const {Pool} = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool
(
    {
        user : process.env.PG_USER,
        host : process.env.PG_HOST,
        database : process.env.PG_DATABASE,
        password : process.env.PG_PASSWORD,
        port : process.env.PG_PORT
    }
);

pool.connect((err) =>
{
    if(err)
        console.log("Error connecting to the database pool", err.message);
    else
        console.log("Connected to Postgres DB successfully");
});

module.exports = pool;

