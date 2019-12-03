const User = require("../models/user.js");

exports.getUsers = function (req, resp) {
	User.findAll(function (err, result) {
		if(err) throw err;
		resp.render('user-list', { users: result });
	})
}

exports.toAddingUser = function (req, resp) {
	resp.render('add-user');
}

exports.addUser = function (req, resp) {
	var user = new User(req.body.name, req.body.surname);
	user.create(user, function (err, result) {
		if(err) throw err;
		resp.redirect('/users/user-list');
	})
}

exports.toEditingUser = function (req, resp) {
	var user = new User();
	user.userId = req.params.id;
	user.findById(user.userId, function (err, result) {
		if(err) throw err;
		resp.render('edit-user', { user: result });
	})
}

exports.editUser = function (req, resp) {
	var user = new User(req.body.name, req.body.surname, req.body.id);
	user.update(user.userId, user, function (err, result) {
		if(err) throw err;
		resp.redirect('/users/user-list');
	})
}

exports.deleteUser = function (req, resp) {
	var user = new User();
	user.userId = req.params.id;
	user.delete(user.userId, function (err, result) {
		if(err) throw err;
		resp.redirect('/users/user-list');
	})
}