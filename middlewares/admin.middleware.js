var db = require ("../db");

module.exports.isAdmin= function(req, res, next) { 

  var transactions = db.get('transactions').find({userId: req.cookies.userId}).value();
  var user = db.get('users').find({id: req.cookies.userId}).value();
  
  if (user.isAdmin === false){
    res.render("transactions/index",{
      transactions: transactions
    });
  } else {
      res.render("transactions/index",{
        transactions: db.get('transactions').value()
    });
  }
  
  next();
}