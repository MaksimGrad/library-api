const express = require("express");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const bookController = require("../controllers/book.controller.js");
const bookRouter = express.Router();

bookRouter.get("/book-list", bookController.getBooks);
bookRouter.get("/add-book", bookController.toAddingBook);
bookRouter.post("/add-book", urlencodedParser, bookController.addBook);
bookRouter.get("/edit-book/:id", bookController.toEditingBook);
bookRouter.post("/edit-book", urlencodedParser, bookController.editBook);
bookRouter.get("/delete-book/:id", bookController.deleteBook);

module.exports = bookRouter;