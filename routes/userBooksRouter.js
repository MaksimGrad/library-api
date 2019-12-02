const express = require("express");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const userBooksController = require("../controllers/user-books.controller.js");
const userBooksRouter = express.Router();

userBooksRouter.get("/user-books-list/:id", userBooksController.getBooksByUserId);
userBooksRouter.post('/add-user-book', urlencodedParser, userBooksController.addUserBook);
userBooksRouter.get('/return-book/:id', userBooksController.editUserBook);

module.exports = userBooksRouter;