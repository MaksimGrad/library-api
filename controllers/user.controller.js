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
	var user = {
		name: req.body.name,
		surname: req.body.surname
	};
	User.create(user, function (err, result) {
		if(err) throw err;
		resp.redirect('/users/user-list');
	})
}

exports.toEditingUser = function (req, resp) {
	var id = req.params.id;
	User.findById(id, function (err, result) {
		if(err) throw err;
		resp.render('edit-user', { user: result });
	})
}

exports.editUser = function (req, resp) {
	var user = {
		id: req.body.id,
		name: req.body.name,
		surname: req.body.surname
	};
	User.update(user.id, user, function (err, result) {
		if(err) throw err;
		resp.redirect('/users/user-list');
	})
}

exports.deleteUser = function (req, resp) {
	var id = req.params.id;
	User.delete(id, function (err, result) {
		if(err) throw err;
		resp.redirect('/users/user-list');
	})
}