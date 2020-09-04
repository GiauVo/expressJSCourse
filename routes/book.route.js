var express = require("express");
var shortid = require("shortid");

var db = require("../db");

var router = express.Router();
var temp = "";

//list of books
router.get("/", (req, res) => {
  res.render("books/index", {
    books: db.get("books").value()
  });
});
//crreate
router.get("/create", function(req, res) {
  res.render("books/create");
});

router.post("/create", function(req, res) {
  req.body.id = shortid.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("/books");
});
//delete
router.get("/:id/delete", function(req, res) {
  var id = req.params.id;
  db.get("books")
    .remove({ id })
    .write();

  res.redirect("back");
});
//update
router.get("/:id", function(req, res) {
  var id = req.params.id;
  temp = id;
  var book = db.get("books").find({ id: id }).value;
  res.render("books/update", {
    book: book
  });
});

router.post("/update", function(req, res) {
  db.get("books")
    .find({ id: temp })
    .assign({ title: req.body.title })
    .write();
  res.redirect("/books");
});

module.exports = router;
