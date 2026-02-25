const express = require("express");
const {allBooks, oneBook, createBook, changeBook, removeBook,bookFilter} = require("../controllers/bookcontrol");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");
const router = express.Router();

router.get("/books", allBooks);

router.get("/books/:id", oneBook);

router.post("/books", authMiddleware, adminMiddleware, createBook);

router.patch("/books/:oldid", authMiddleware, adminMiddleware, changeBook);

router.delete("/books/:id", authMiddleware, adminMiddleware, removeBook);

router.get("/books/filter/:searchterm", bookFilter);

module.exports = router;