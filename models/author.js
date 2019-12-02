var db = require('../db');

module.exports = class Author {

	static findAll(cb) {
		let query = "SELECT * FROM authors Order by authorSurname";
		db.get().query(query, function (err, result, fields) {
			cb(err, result);
		});
	}

	static findById(id, cb) {
		let query = `SELECT * FROM authors WHERE id = ${id}`;
		db.get().query(query, function (err, result, fields) {
			cb(err, result);
		});
	}

	static create(author, cb) {
		db.get().query('INSERT INTO authors SET ?', author, function(err, result) {
			cb(err, result);
		})
	}

	static update(id, author, cb) {
		let query = `UPDATE authors SET ? WHERE id = ${id}`;
		db.get().query(query, author, function(err, result) {
			cb(err, result);
		})
	}

	static delete(id, cb) {
		let query = `DELETE FROM authors WHERE id = ${id}`;
		db.get().query(query, function(err, result) {
			cb(err, result);
		})
	}
}