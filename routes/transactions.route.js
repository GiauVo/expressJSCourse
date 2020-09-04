var express = require("express");
var shortid = require("shortid");

var db = require("../db");

var router = express.Router();

//list of books
router.get("/", (req, res) => {
  var transactions = db.get("transactions").value();
  var extendTrans = transactions.map(function(item){
    var temp1 = {};
    var temp2 = {};
    temp1 = db.get('users').find({id: item.userId}).value();
    temp2 = db.get('books').find({id: item.bookId}).value();
    return Object.assign(item,temp1,temp2);
  });
  
  res.render("transactions/index", {
    transactions: extendTrans
  });
});
//crreate
router.get("/create", function(req, res) {
  res.render("transactions/create", {
    books: db.get("books").value(),
    users: db.get("users").value()
  });
});

router.post("/create", function(req, res) {
  req.body.id = shortid.generate();
  var user = db.get('users').find({name: req.body.name}).value();
  var book = db.get('books').find({title: req.body.title}).value();
  
  db.get("transactions")
    .push({transId: req.body.id, userId: user.id, bookId: book.id})
    .write();
  res.redirect("/transactions");
});

module.exports = router;