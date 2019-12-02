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
	var author = {
		authorName: req.body.name,
		authorSurname: req.body.surname
	};
	Author.create(author, function (err, result) {
		if(err) throw err;
		resp.redirect('/authors/author-list');
	})
}

exports.toEditingAuthor = function (req, resp) {
	var id = req.params.id;
	Author.findById(id, function (err, result) {
		if(err) throw err;
		resp.render('edit-author', { author: result });
	})
}

exports.editAuthor = function (req, resp) {
	var author = {
		id: req.body.id,
		authorName: req.body.name,
		authorSurname: req.body.surname
	};
	Author.update(author.id, author, function (err, result) {
		if(err) throw err;
		resp.redirect('/authors/author-list');
	})
}

exports.deleteAuthor = function (req, resp) {
	var id = req.params.id;
	Author.delete(id, function (err, result) {
		if(err) throw err;
		resp.redirect('/authors/author-list');
	})
}