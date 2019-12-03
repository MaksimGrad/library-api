var db = require('../db');

module.exports = class User {

	constructor(name, surname, id = null) {
		this.name = name;
		this.surname = surname;
		if (id !== null) this.id = id;
	}

	get userId() {
		return this.id;
	}

	set userId(newId) {
		this.id = newId;
	}

	static findAll(cb) {
		let query = 
		"SELECT * FROM users Order by surname";
		db.get().query(query, function (err, result, fields) {
			cb(err, result);
		})
	}

	findById(id, cb) {
		let query = `SELECT * FROM users WHERE id = ${id}`;
		db.get().query(query, function (err, result, fields) {
			cb(err, result);
		});
	}

	create(user, cb) {
		db.get().query('INSERT INTO users SET ?', user, function(err, result) {
			cb(err, result);
		})
	}

	update(id, user, cb) {
		let query = `UPDATE users SET ? WHERE id = ${id}`;
		db.get().query(query, user, function(err, result) {
			cb(err, result);
		})
	}

	delete(id, cb) {
		let query = `DELETE FROM users WHERE id = ${id}`;
		db.get().query(query, function(err, result) {
			cb(err, result);
		})
	}
}