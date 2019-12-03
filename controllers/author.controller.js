const Author = require("../models/author.js");

exports.getAuthors = function (req, resp) {
	Author.findAll(function (err, result) {
		if(err) throw err;
		resp.render('author-list', { authors: result });
	})
}

exports.toAddingAuthor = function (req, resp) {
	resp.render('add-author');
}

exports.addAuthor = function (req, resp) {
	var author = new Author(req.body.name, req.body.surname);
	author.create(author, function (err, result) {
		if(err) throw err;
		resp.redirect('/authors/author-list');
	})
}

exports.toEditingAuthor = function (req, resp) {
	var author = new Author();
	author.authorId = req.params.id;
	author.findById(author.authorId, function (err, result) {
		if(err) throw err;
		resp.render('edit-author', { author: result });
	})
}

exports.editAuthor = function (req, resp) {
	var author = new Author(req.body.name, req.body.surname, req.body.id);
	author.update(author.authorId, author, function (err, result) {
		if(err) throw err;
		resp.redirect('/authors/author-list');
	})
}

exports.deleteAuthor = function (req, resp) {
	var author = new Author();
	author.authorId = req.params.id;
	author.delete(author.authorId, function (err, result) {
		if(err) throw err;
		resp.redirect('/authors/author-list');
	})
}