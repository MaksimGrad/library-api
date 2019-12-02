var db = require('../db');

module.exports = class UserBook {

	static findByUserId(id, cb) {
		let query = 
		`SELECT d.*, b.name, a.authorName, a.authorSurname 
		FROM book_delivery as d 
		LEFT JOIN books as b on d.bookId = b.Id 
		LEFT JOIN authors as a on b.authorId = a.id 
		WHERE d.userId = ${id}
		Order by d.issue_date DESC`;

		db.get().query(query, function (err, result, fields) {
			cb(err, result);
		})
	}

	static findById(id, cb) {
		let query = `SELECT * FROM book_delivery WHERE id = ${id}`;
		db.get().query(query, function (err, result, fields) {
			cb(err, result);
		});
	}

	static create(userBook, cb) {
		db.get().query('INSERT INTO book_delivery SET ?', userBook, function(err, result) {
			cb(err, result);
		})
	}

	static update(id, userBook, cb) {
		let query = `UPDATE book_delivery SET ? WHERE id = ${id}`;
		db.get().query(query, userBook, function(err, result) {
			cb(err, result);
		})
	}
}