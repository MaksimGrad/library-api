const express = require("express");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const authorController = require("../controllers/author.controller.js");
const authorRouter = express.Router();

authorRouter.get("/author-list", authorController.getAuthors);
authorRouter.get("/add-author", authorController.toAddingAuthor);
authorRouter.post("/add-author", urlencodedParser, authorController.addAuthor);
authorRouter.get("/edit-author/:id", authorController.toEditingAuthor);
authorRouter.post("/edit-author", urlencodedParser, authorController.editAuthor);
authorRouter.get("/delete-author/:id", authorController.deleteAuthor);

module.exports = authorRouter;