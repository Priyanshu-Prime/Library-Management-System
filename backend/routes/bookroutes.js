const express = require("express");
const {allBooks, oneBook, createBook, changeBook, removeBook,bookFilter} = require("../controllers/bookcontrol");
const router = express.Router();

router.get("/books", allBooks);

router.get("/books/:id", oneBook);

router.post("/books", createBook);

router.patch("/books/:oldid", changeBook);

router.delete("/books/:id", removeBook);

router.get("/books/filter:searchText",bookFilter);
module.exports = router;