var db = require ("../db");


module.exports.postCreate = function(req, res, next) {
  //validate username: less than 30 letters or give error
  var errors = [];
  var arrTemp = req.body.name.split(/\s*/); //convert string into array without spaces  
  var user = db.get("users").find({email : req.body.email}).value();
  
  if (arrTemp.length > 30) {
    errors.push("Username must have less than 30 letters");
  }
  
  if (user) {
    console.log(user);
    errors.push("Email have been exists! Please use another email!");
  }
  
  if (req.body.password.length < 10) {
    errors.push("Password must have more than 10 letters");
  }
  
  if (errors.length) {
    res.render("users/create", {
      errors: errors,
      values: req.body
    });

    return; //to ignore statements (codes) after
  }
  res.locals.success = true;
  next();
}