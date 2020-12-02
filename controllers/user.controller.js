var shortid = require("shortid");

var db = require("../db");
var bcrypt = require('bcrypt');
var saltRounds = 10;
var temp = '';
module.exports.index = function(req, res) {
  var users = db.get("users").value();

  var page = req.query.page ? parseInt(req.query.page) : 1;

  var perPage = 3;

  var begin = (page - 1) * perPage;
  var end = begin + perPage;

  var lengthPage = Math.ceil(users.length / perPage);

  res.render("users/index", {
    users: users.slice(begin, end),
    page,
    lengthPage
  });
};

module.exports.create = function(req, res) {
  res.render("users/create");
}

module.exports.postCreate = function(req, res) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    db.get("users")
      .push({id: shortid.generate(), name: req.body.name, email: req.body.email, password: hash, info: req.body.info, isAdmin: false})
      .write();
    res.redirect("/users");
  });
}

module.exports.delete = function(req, res) {
  var id = req.params.id;
  db.get("users")
    .remove({ id })
    .write();
  res.redirect("back");
}

module.exports.update = function(req, res) {
  var id = req.params.id;
  temp = id;
  var user = db.get("users").find({ id: id }).value();
  res.render("users/update", {
    user: user
  });
}

module.exports.postUpdate = function(req, res) {
  db.get("users")
    .find({ id: temp })
    .assign({ name: req.body.name, email: req.body.email })
    .write();
  res.redirect("/users");
}