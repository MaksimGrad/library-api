var db = require('../db');

module.exports = class Author {

	constructor(authorName, authorSurname, id = null) {
		this.authorName = authorName;
		this.authorSurname = authorSurname;
		if (id !== null) this.id = id;
	}

	get authorId() {
		return this.id;
	}

	set authorId(newId) {
		this.id = newId;
	}

	static findAll(cb) {
		let query = "SELECT * FROM authors Order by authorSurname";
		db.get().query(query, function (err, result, fields) {
			cb(err, result);
		});
	}

	findById(id, cb) {
		let query = `SELECT * FROM authors WHERE id = ${id}`;
		db.get().query(query, function (err, result, fields) {
			cb(err, result);
		});
	}

	create(author, cb) {
		db.get().query('INSERT INTO authors SET ?', author, function(err, result) {
			cb(err, result);
		})
	}

	update(id, author, cb) {
		let query = `UPDATE authors SET ? WHERE id = ${id}`;
		db.get().query(query, author, function(err, result) {
			cb(err, result);
		})
	}

	delete(id, cb) {
		let query = `DELETE FROM authors WHERE id = ${id}`;
		db.get().query(query, function(err, result) {
			cb(err, result);
		})
	}
}