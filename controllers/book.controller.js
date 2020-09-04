var shortid = require("shortid");

var db = require("../db");
var temp = '';
module.exports.index = function(req, res) {
  res.render("books/index", {
    books: db.get("books").value()
  });
}

module.exports.create = function(req, res) {
  res.render("books/create");
}

module.exports.postCreate = function(req, res) {
  req.body.id = shortid.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("/books");
}

module.exports.delete = function(req, res) {
  var id = req.params.id;
  db.get("books")
    .remove({ id })
    .write();

  res.redirect("back");
}

module.exports.update = function(req, res) {
  var id = req.params.id;
  temp = id;
  var book = db.get("books").find({ id: id }).value();
  res.render("books/update", {
    book: book
  });
}

module.exports.postUpdate = function(req, res) {
  db.get("books")
    .find({ id: temp })
    .assign({ title: req.body.title })
    .write();
  res.redirect("/books");
}