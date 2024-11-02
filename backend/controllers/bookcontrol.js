const {getAllBooks, getBookByID, addBook, updateBook, deleteBook,filterBooks} = require("../models/book");

const allBooks = async(req, res) =>
{
    try
    {
        const books = await getAllBooks();
        console.log("get books req");
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
    const {id, name, author, image} = req.body;
    try
    {
        const book = await addBook(id, name, author, image);
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
    const {oldid} = req.params;
    const {id, name, author, image} = req.body;
    try
    {
        const book = await updateBook(id, name, author, image, oldid);
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

const bookFilter = async(req,res) => {
    const {searchText} = req.param;
    try {
        const records = await filterBooks(searchText);
        res.status(200).json(records);
    }
    catch(err) {
        console.log("Error in bookFilter in bookcontrol.js");
        throw err;
    }
}

module.exports = {allBooks, oneBook, createBook, changeBook, removeBook,bookFilter};