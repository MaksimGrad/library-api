const Book = require("../models/book.js");
const Author = require("../models/author.js");

exports.getBooks = function (req, resp) {
	Book.findAll(function (err, result) {
		if(err) throw err;
		resp.render('book-list', { books: result });
	})
}

exports.toAddingBook = function (req, resp) {
	Author.findAll(function (err, result) {
		if(err) throw err;
		resp.render('add-book', { authors: result });
	})
}

exports.addBook = function (req, resp) {

	var book = new Book(req.body.bookName, req.body.authorId);
	book.create(book, function (err, result) {
		if(err) throw err;
		resp.redirect('/books/book-list');
	})
}

exports.toEditingBook = function (req, resp) {
	var book = new Book();
	book.bookId = req.params.id;
	book.findById(book.bookId, function (err, book) {
		if(err) throw err;
		Author.findAll(function (err, authors) {
			if(err) throw err;
			resp.render('edit-book', { book: book, authors: authors });
		})
	})
}

exports.editBook = function (req, resp) {
	var book = new Book(req.body.bookName, req.body.authorId, req.body.id);
	book.update(book.bookId, book, function (err, result) {
		if(err) throw err;
		resp.redirect('/books/book-list');
	})
}

exports.deleteBook = function (req, resp) {
	var book = new Book();
	book.bookId = req.params.id;
	book.delete(book.bookId, function (err, result) {
		if(err) throw err;
		resp.redirect('/books/book-list');
	})
}