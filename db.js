var mysql = require('mysql');
var database;

var state = {
	db: null
};

exports.conn = function (done) {
	if (state.db) {
		return done();
	}

	database = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "library_db"
	});

	database.connect(function (err) {
		if (err) {
			return done(err);
		}
		state.db = database;
		done()
	});
}

exports.get = function () {
  return state.db;
}