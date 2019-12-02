const express = require("express");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const userController = require("../controllers/user.controller.js");
const userRouter = express.Router();

userRouter.get("/user-list", userController.getUsers);
userRouter.get("/add-user", userController.toAddingUser);
userRouter.post("/add-user", urlencodedParser, userController.addUser);
userRouter.get("/edit-user/:id", userController.toEditingUser);
userRouter.post("/edit-user", urlencodedParser, userController.editUser);
userRouter.get("/delete-user/:id", userController.deleteUser);

module.exports = userRouter;