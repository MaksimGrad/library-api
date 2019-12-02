var db = require('../db');

module.exports = class User {

	static findAll(cb) {
		let query = 
		"SELECT * FROM users Order by surname";
		db.get().query(query, function (err, result, fields) {
			cb(err, result);
		})
	}

	static findById(id, cb) {
		let query = `SELECT * FROM users WHERE id = ${id}`;
		db.get().query(query, function (err, result, fields) {
			cb(err, result);
		});
	}

	static create(user, cb) {
		db.get().query('INSERT INTO users SET ?', user, function(err, result) {
			cb(err, result);
		})
	}

	static update(id, user, cb) {
		let query = `UPDATE users SET ? WHERE id = ${id}`;
		db.get().query(query, user, function(err, result) {
			cb(err, result);
		})
	}

	static delete(id, cb) {
		let query = `DELETE FROM users WHERE id = ${id}`;
		db.get().query(query, function(err, result) {
			cb(err, result);
		})
	}
}