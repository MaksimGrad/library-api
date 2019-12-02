const UserBook = require("../models/user-book.js");
const User = require("../models/user.js");
const Book = require("../models/book.js");

exports.getBooksByUserId = function (req, resp) {
	var id = req.params.id;
	UserBook.findByUserId (id, function (err, books) {
		if(err) throw err;
		User.findById (id, function (err, user) {
			if(err) throw err;
			Book.findAll (function (err, allBooks) {
				if(err) throw err;
				resp.render('user-books-list', { userbooks: books, user: user, books: allBooks });
			})
		})
	})
}

exports.addUserBook = function (req, resp) {
	var userBook = {
		bookId: req.body.bookId,
		userId: req.body.userId
	};
	UserBook.create(userBook, function (err, result) {
		if(err) throw err;
		resp.redirect(`/user-books/user-books-list/${userBook.userId}`);
	})
}

exports.editUserBook = function (req, resp) {
	var id = req.params.id;
	UserBook.findById(id, function (err, userBook) {
		if(err) throw err;

		let cur = new Date()
		userBook[0]['return_date'] = `${cur.getFullYear()}.${cur.getMonth() + 1}.${cur.getDate()} 
		${cur.getHours()}:${cur.getMinutes()}:${cur.getSeconds()}`;

		UserBook.update(userBook[0].id, userBook[0], function (err, result) {
			if(err) throw err;
			resp.redirect(`/user-books/user-books-list/${userBook[0].userId}`);
		})
	})
}