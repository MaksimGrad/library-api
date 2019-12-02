const express = require("express");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const homeController = require("../controllers/home.controller.js");
const homeRouter = express.Router();

homeRouter.get("/", homeController.index);

module.exports = homeRouter;