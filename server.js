const express = require("express");
const app = express();
var db = require('./db');

app.set("view engine", "ejs");

const homeRouter = require("./routes/homeRouter.js");
const bookRouter = require("./routes/bookRouter.js");
const authorRouter = require("./routes/authorRouter.js");
const userRouter = require("./routes/userRouter.js");
const userBooksRouter = require("./routes/userBooksRouter.js");

app.use("/", homeRouter);
app.use("/books", bookRouter);
app.use("/authors", authorRouter);
app.use("/users", userRouter);
app.use("/user-books", userBooksRouter);

db.conn (function(err) {
	if(err) throw err;
	console.log("Connected to MySql!")

	app.listen(7777, function () {
		console.log('API app started');
	})
});
