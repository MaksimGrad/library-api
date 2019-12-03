var db = require('../db');

module.exports = class Book {

	constructor(name, authorId, id = null) {
		this.name = name;
		this.authorId = authorId;
		if (id !== null) this.id = id;
	}

	get bookId() {
		return this.id;
	}

	set bookId(newId) {
		this.id = newId;
	}

	static findAll(cb) {
		let query = 
		`SELECT b.*, a.authorSurname, a.authorName 
		FROM books as b 
		LEFT JOIN authors as a on b.authorId = a.id`;
		db.get().query(query, function (err, result, fields) {
			cb(err, result);
		})
	}

	findById(id, cb) {
		let query = `SELECT * FROM books WHERE id = ${id}`;
		db.get().query(query, function (err, result, fields) {
			cb(err, result);
		});
	}

	create(book, cb) {
		db.get().query('INSERT INTO books SET ?', book, function(err, result) {
			cb(err, result);
		})
	}

	update(id, book, cb) {
		let query = `UPDATE books SET ? WHERE id = ${id}`;
		db.get().query(query, book, function(err, result) {
			cb(err, result);
		})
	}

	delete(id, cb) {
		let query = `DELETE FROM books WHERE id = ${id}`;
		db.get().query(query, function(err, result) {
			cb(err, result);
		})
	}
}