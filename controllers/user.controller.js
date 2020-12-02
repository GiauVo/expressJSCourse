var shortid = require("shortid");

var db = require("../db");
var temp = '';
module.exports.index = function(req, res) {
  res.render("users/index", {
    users: db.get("users").value()
  });
}

module.exports.create = function(req, res) {
  res.render("users/create");
}

module.exports.postCreate = function(req, res) {
  req.body.id = shortid.generate();
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
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
    .assign({ name: req.body.name, info: req.body.info })
    .write();
  res.redirect("/users");
}