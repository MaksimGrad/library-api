var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();

app.set("view engine", "ejs");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", function (req, resp) {
	resp.render('index');
});

/*	books  */
app.get('/book-list', function (req, resp) {
	let query = 
	`SELECT b.*, a.authorSurname, a.authorName 
	FROM books as b 
	LEFT JOIN authors as a on b.authorId = a.id`;
	db.query(query, function (err, result, fields) {
		if (err) throw err;
		resp.render('book-list', { books: result });
	});
});

app.get('/add-book', function (req, resp) {
	let query = "SELECT * FROM authors";
	db.query(query, function (err, result, fields) {
		if (err) throw err;
		resp.render('add-book', { authors: result });
	});
});

app.post('/add-book', urlencodedParser, function(req, resp) {
	if(!req.body) return resp.sendStatus(400);
	var book = {
		name: req.body.bookName,
		authorId: req.body.authorId
	};
	db.query('INSERT INTO books SET ?', book, function(err, result) {
		if(err) {
			throw err;
			res.sendStatus(500);
		}
		console.log("1 book inserted, id: " + result.insertId);
		resp.redirect('/book-list');
	})
});

app.get('/edit-book/:id', function (req, resp) {
	if(!req.params) return resp.sendStatus(400);
	let query = "SELECT * FROM authors";
	db.query(query, function (err, authors, fields) {
		if (err) throw err;
		let bookQuery = `SELECT * FROM books WHERE id = ${req.params.id}`;
		db.query(bookQuery, function (err, book, fields) {
			if (err) throw err;
			resp.render('edit-book', { book: book, authors: authors });
		});
	});
});

app.post('/edit-book', urlencodedParser, function(req, resp) {
	if(!req.body) return resp.sendStatus(400);
	var book = {
		id: req.body.id,
		name: req.body.bookName,
		authorId: req.body.authorId
	};
	let query = `UPDATE books SET ? WHERE id = ${book.id}`;
	db.query(query, book, function(err, result) {
		if(err) {
			throw err;
			res.sendStatus(500);
		}
		console.log("1 book edited, id: " + result.insertId);
		resp.redirect('/book-list');
	})
});

app.get('/delete-book/:id', function (req, resp) {
	if(!req.params) return resp.sendStatus(400);
	let query = `DELETE FROM books WHERE id = ${req.params.id}`;
	db.query(query, function(err, result) {
		if(err) {
			throw err;
			res.sendStatus(500);
		}
		console.log("1 book deleted, id: " + result.insertId);
		resp.redirect('/book-list');
	})
});

/*	authors  */
app.get('/author-list', function (req, resp) {
	let query = "SELECT * FROM authors Order by authorSurname";
	db.query(query, function (err, result, fields) {
		if (err) throw err;
		resp.render('author-list', { authors: result });
	});
});

app.get('/add-author', function (req, resp) {
	resp.render('add-author');
});

app.post('/add-author', urlencodedParser, function(req, resp) {
	if(!req.body) return resp.sendStatus(400);
	var author = {
		authorName: req.body.name,
		authorSurname: req.body.surname
	};
	db.query('INSERT INTO authors SET ?', author, function(err, result) {
		if(err) {
			throw err;
			res.sendStatus(500);
		}
		console.log("1 author inserted, id: " + result.insertId);
		resp.redirect('/author-list');
	})
});

app.get('/edit-author/:id', function (req, resp) {
	if(!req.params) return resp.sendStatus(400);
	let query = `SELECT * FROM authors WHERE id = ${req.params.id}`;
	db.query(query, function (err, result, fields) {
		if (err) throw err;
		resp.render('edit-author', { author: result });
	});
});

app.post('/edit-author', urlencodedParser, function(req, resp) {
	if(!req.body) return resp.sendStatus(400);
	var author = {
		id: req.body.id,
		authorName: req.body.name,
		authorSurname: req.body.surname
	};
	let query = `UPDATE authors SET ? WHERE id = ${author.id}`;
	db.query(query, author, function(err, result) {
		if(err) {
			throw err;
			res.sendStatus(500);
		}
		console.log("1 author edited, id: " + result.insertId);
		resp.redirect('/author-list');
	})
});

app.get('/delete-author/:id', function (req, resp) {
	if(!req.params) return resp.sendStatus(400);
	let query = `DELETE FROM authors WHERE id = ${req.params.id}`;
	db.query(query, function(err, result) {
		if(err) {
			throw err;
			res.sendStatus(500);
		}
		console.log("1 author deleted, id: " + result.insertId);
		resp.redirect('/author-list');
	})
});

/*	users  */
app.get('/user-list', function (req, resp) {
	let query = "SELECT * FROM users Order by surname";
	db.query(query, function (err, result, fields) {
		if (err) throw err;
		resp.render('user-list', { users: result });
	});
});

app.get('/add-user', function (req, resp) {
	resp.render('add-user');
});

app.post('/add-user', urlencodedParser, function(req, resp) {
	if(!req.body) return resp.sendStatus(400);
	var user = {
		name: req.body.name,
		surname: req.body.surname
	};
	db.query('INSERT INTO users SET ?', user, function(err, result) {
		if(err) {
			throw err;
			res.sendStatus(500);
		}
		console.log("1 user inserted, id: " + result.insertId);
		resp.redirect('/user-list');
	})
});

app.get('/edit-user/:id', function (req, resp) {
	if(!req.params) return resp.sendStatus(400);
	let query = `SELECT * FROM users WHERE id = ${req.params.id}`;
	db.query(query, function (err, result, fields) {
		if (err) throw err;
		resp.render('edit-user', { user: result });
	});
});

app.post('/edit-user', urlencodedParser, function(req, resp) {
	if(!req.body) return resp.sendStatus(400);
	var user = {
		id: req.body.id,
		name: req.body.name,
		surname: req.body.surname
	};
	let query = `UPDATE users SET ? WHERE id = ${user.id}`;
	db.query(query, user, function(err, result) {
		if(err) {
			throw err;
			res.sendStatus(500);
		}
		console.log("1 user edited, id: " + result.insertId);
		resp.redirect('/user-list');
	})
});

app.get('/delete-user/:id', function (req, resp) {
	if(!req.params) return resp.sendStatus(400);
	let query = `DELETE FROM users WHERE id = ${req.params.id}`;
	db.query(query, function(err, result) {
		if(err) {
			throw err;
			res.sendStatus(500);
		}
		console.log("1 user deleted, id: " + result.insertId);
		resp.redirect('/user-list');
	})
});

/*	user books  */
app.get('/user-books/:id', function (req, resp) {
	if(!req.params) return resp.sendStatus(400);
	let query = 
	`SELECT d.*, b.name, a.authorName, a.authorSurname 
	FROM book_delivery as d 
	LEFT JOIN books as b on d.bookId = b.Id 
	LEFT JOIN authors as a on b.authorId = a.id 
	WHERE d.userId = ${req.params.id}
	Order by d.issue_date DESC`;
	db.query(query, function (err, userbooks, fields) {
		if (err) throw err;
		let queryUser = `SELECT * FROM users WHERE id = ${req.params.id}`;
		db.query(queryUser, function (err, user, fields) {
			if (err) throw err;
			let queryBooks = 
			`SELECT b.*, a.authorSurname, a.authorName 
			FROM books as b 
			LEFT JOIN authors as a on b.authorId = a.id`;
			db.query(queryBooks, function (err, books, fields) {
				if (err) throw err;
				resp.render('user-books', { userbooks: userbooks, user: user, books: books });
			});
		});
	});
});

app.post('/add-user-book', urlencodedParser, function(req, resp) {
	if(!req.body) return resp.sendStatus(400);
	var userBook = {
		bookId: req.body.bookId,
		userId: req.body.userId
	};
	db.query('INSERT INTO book_delivery SET ?', userBook, function(err, result) {
		if(err) {
			throw err;
			res.sendStatus(500);
		}
		console.log("1 user book inserted, id: " + result.insertId);
		resp.redirect(`/user-books/${req.body.userId}`);
	})
});

app.get('/return-book/:id', function (req, resp) {
	if(!req.params) return resp.sendStatus(400);
	let cur = new Date()
	let now = `'${cur.getFullYear()}.${cur.getMonth() + 1}.${cur.getDate()} ${cur.getHours()}:${cur.getMinutes()}:${cur.getSeconds()}'`;
	let query = `UPDATE book_delivery SET return_date = ${now} WHERE id = ${req.params.id}`;
	db.query(query, function (err, result, fields) {
		if (err) throw err;
		let queryBook = `SELECT userId FROM book_delivery WHERE id = ${req.params.id}`;
		db.query(queryBook, function (err, book, fields) {
			if (err) throw err;
			resp.redirect(`/user-books/${book[0].userId}`);
		});
	});
});

var db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "library_db"
});

db.connect(function(err) {
	if(err) throw err;
	console.log("Connected to MySql!")

	app.listen(7777, function () {
		console.log('API app started');
	})
});
