const {getAllBooks, getBookByID, addBook, updateBook, deleteBook} = require("../models/book");

const allBooks = async(req, res) =>
{
    try
    {
        const books = await getAllBooks();
        req.status(200).json(books);
    }
    catch (err)
    {
        console.log("Error in allBooks in bookcontrol.js");
        res.status(500).json({error: "Failed to get books"});
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
            res.status(500).json({erro: "Book not found"});
    }
    catch(err)
    {
        console.log("Error in oneBook in bookcontrol.js");
        res.status(500).json({error: "Failed to get book"});
    }
};

const createBook = async(req, res) =>
{
    const {id, name, author} = req.body;
    try
    {
        const book = await addBook(id, name, author);
        res.status(201).json(book);
    }
    catch(err)
    {
        console.log("Error in createBook in bookcontrol.js");
        res.status(500).json({error: "Failed to create book"});
    }
};

const changeBook = async(req, res) =>
{
    const {id, name, author} = req.body;
    try
    {
        const book = await updateBook(id, name, author);
        res.status(200).json(book);
    }
    catch(err)
    {
        console.log("Error in changeBook in bookcontrol.js");
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