var db = require('../db');

module.exports = class Book {

	static findAll(cb) {
		let query = 
		`SELECT b.*, a.authorSurname, a.authorName 
		FROM books as b 
		LEFT JOIN authors as a on b.authorId = a.id`;
		db.get().query(query, function (err, result, fields) {
			cb(err, result);
		})
	}

	static findById(id, cb) {
		let query = `SELECT * FROM books WHERE id = ${id}`;
		db.get().query(query, function (err, result, fields) {
			cb(err, result);
		});
	}

	static create(book, cb) {
		db.get().query('INSERT INTO books SET ?', book, function(err, result) {
			cb(err, result);
		})
	}

	static update(id, book, cb) {
		let query = `UPDATE books SET ? WHERE id = ${id}`;
		db.get().query(query, book, function(err, result) {
			cb(err, result);
		})
	}

	static delete(id, cb) {
		let query = `DELETE FROM books WHERE id = ${id}`;
		db.get().query(query, function(err, result) {
			cb(err, result);
		})
	}
}