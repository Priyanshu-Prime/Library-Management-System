const {getAllBooks, getBookByID, addBook, updateBook, deleteBook} = require("../models/book");

const allBooks = async(req, res) =>
{
    try
    {
        const books = await getAllBooks();
        res.status(200).json(books);
    }
    catch (err)
    {
        console.log("Error in allBooks in bookcontrol.js");
        res.status(500).json({error: "Failed to get books"});
        console.log(err.stack);
    }
};

const oneBook = async(req, res) =>
{
    const {id} = req.params;
    try
    {
        const book = await getBookByID(id);
        if (book)
            res.status(200).json(book);
        else
            res.status(500).json({error: "Book not found"});
    }
    catch(err)
    {
        console.log("Error in oneBook in bookcontrol.js");
        res.status(500).json({error: "Failed to get book"});
    }
};

const createBook = async(req, res) =>
{
    let {id, name, author} = req.body;
    // console.log(`${id} and ${name} and ${author}`);
    try
    {
        const book = await addBook(id, name, author);
        res.status(201).json(book);
    }
    catch(err)
    {
        console.log("Error in createBook in bookcontrol.js");
        res.status(500).json({error: "Failed to create book"});
        console.log(err.stack);
    }
};

const changeBook = async(req, res) =>
{
    const {oldid} = req.params;
    const {id, name, author} = req.body;
    console.log(id);
    try
    {
        const book = await updateBook(id, name, author, oldid);
        res.status(200).json(book);
    }
    catch(err)
    {
        console.log("Error in changeBook in bookcontrol.js");
        console.log(err.stack);
        res.status(500).json({error: "Failed to update book"});
    }
};

const removeBook = async(req, res) =>
{
    const {id} = req.params;
    try
    {
        const book = await deleteBook(id);
        res.status(200).json({message: "Book deleted successfully"});
    }
    catch(err)
    {
        console.log("Error in removeBook in bookcontrol.js");
        res.status(500).json({error: "Failed to delete book"});
    }
};

module.exports = {allBooks, oneBook, createBook, changeBook, removeBook};