var shortid = require("shortid");

var db = require("../db");
var temp = '';
module.exports.index = function(req, res) {
  var transactions = [];
  var user = db.get('users').find({id: req.cookies.userId}).value();
  
  if (user.isAdmin === false){
    transactions = db.get('transactions').filter({userId: req.cookies.userId}).value();
  } else {
     transactions= db.get('transactions').value();
  }
  
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
  var transactions = db.get("transactions").value();
  var checkId = db.get("transactions").find({ transId: transId }).value();
  var error = [];
  //divide into 2 steps to check ID
  if (!checkId) {//notice: given the condition correctly, check the value of transactions, not its 'length'
    error.push("Not ID exist matched"); 
  }
  if (error.length) {
    res.render("transactions/index", {
      errors: error,
      transactions: transactions //remember return transactions's data list to render
    });
  }

  db.get("transactions")
    .find({ transId: req.params.transId })
    .assign({ isComplete: true })
    .write();
  res.redirect("/transactions"); //notice: passed the path correctly
};
//author: Vo Ngoc Giau