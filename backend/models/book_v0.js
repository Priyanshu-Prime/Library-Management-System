const pool = require("../config/db");

const getAllBooks = async() =>
{
    try 
    {
        const data = await pool.query("SELECT * FROM book ORDER BY(id)");
        return data.rows;
    }
    catch(err)
    {
        console.log("Error in getAllBooks in book.js");
        console.log(err.stack);
        throw err;
    }
};

const getBookByID = async(id) =>
{
    try
    {
        const data = await pool.query("SELECT * FROM book WHERE id=$1", [id]);
        return data.rows[0];
    }
    catch(err)
    {
        console.log("Error in getBookByID in book.js");
        throw err;
    }
};

const addBook = async(id, name, author) =>
{
    try
    {
        const data = await pool.query("INSERT INTO book VALUES($1, $2, $3) RETURNING *", [id, name, author]);
        return data.rows[0];
    }
    catch(err)
    {
        console.log("Error in addBook in book.js");
        console.log(err.stack);
        throw err;
    }
};

const updateBook = async(id, name, author, old) =>
{
    console.log(`${old} ${id} ${name} ${author}`);
    try
    {
        const data = await pool.query("UPDATE book SET id=$1, name=$2, author=$3 WHERE id=$4", [id, name, author, old]);
        console.log("Updated book details successfully");
        return data.rows[0];
    }
    catch(err)
    {
        console.log("Error in updateBook in book.js");
        console.log(err.stack);
        throw err;
    }
};

const deleteBook = async(id) =>
{
    try
    {
        const data = await pool.query("DELETE FROM book WHERE id=$1", [id]);
        console.log("Book deleted");
    }
    catch(err)
    {
        console.log("Error in deleteBook in book.js");
        console.log(err.stack);
        throw err;
    }
};

module.exports = {getAllBooks, getBookByID, addBook, updateBook, deleteBook};