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
	var book = {
		name: req.body.bookName,
		authorId: req.body.authorId
	};
	Book.create(book, function (err, result) {
		if(err) throw err;
		resp.redirect('/books/book-list');
	})
}

exports.toEditingBook = function (req, resp) {
	var id = req.params.id;
	Book.findById(id, function (err, book) {
		if(err) throw err;
		Author.findAll(function (err, authors) {
			if(err) throw err;
			resp.render('edit-book', { book: book, authors: authors });
		})
	})
}

exports.editBook = function (req, resp) {
	var book = {
		id: req.body.id,
		name: req.body.bookName,
		authorId: req.body.authorId
	};
	Book.update(book.id, book, function (err, result) {
		if(err) throw err;
		resp.redirect('/books/book-list');
	})
}

exports.deleteBook = function (req, resp) {
	var id = req.params.id;
	Book.delete(id, function (err, result) {
		if(err) throw err;
		resp.redirect('/books/book-list');
	})
}