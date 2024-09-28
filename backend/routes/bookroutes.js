const express = require("express");
const {allBooks, oneBook, createBook, changeBook, removeBook} = require("../controllers/bookcontrol");
const router = express.Router();

router.get("/books", allBooks);

router.get("/books/:id", oneBook);

router.post("/books", createBook);

router.put("/books/:id", changeBook);

router.delete("/books/:id", removeBook);

module.exports = router;