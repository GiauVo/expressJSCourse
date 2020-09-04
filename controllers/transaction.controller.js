var shortid = require("shortid");

var db = require("../db");
var temp = '';
module.exports.index = function(req, res) {
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
}

module.exports.create = function(req, res) {
  res.render("transactions/create", {
    books: db.get("books").value(),
    users: db.get("users").value()
  });
}

module.exports.postCreate = function(req, res) {
  req.body.id = shortid.generate();
  var user = db.get('users').find({name: req.body.name}).value();
  var book = db.get('books').find({title: req.body.title}).value();
  
  db.get("transactions")
    .push({transId: req.body.id, userId: user.id, bookId: book.id, isComplete: false})
    .write();
  res.redirect("/transactions");
}

module.exports.complete = function(req, res) {
  var transId = req.params.transId;
  db.get("transactions")
    .find({transId: transId})
    .assign({isComplete: true})
    .write();
  res.redirect("back");
}
