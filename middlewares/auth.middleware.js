var db = require ("../db");
module.exports.requireAuth= function(req, res, next) { 

  var user = db.get('users').find({id: req.signedCookies.userId}).value();
  
  if (!req.signedCookies.userId || !user){
    res.redirect("/auth/login");
    return;
  }     
  next();
}