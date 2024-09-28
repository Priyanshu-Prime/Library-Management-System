const pool = require("../config/db");

const getAllBooks = async() =>
{
    try 
    {
        const data = await pool.query("SELECT * FROM book");
        return data.rows;
    }
    catch(err)
    {
        console.log(err);
        throw err;
    }
};