var bcrypt = require("bcrypt");
var saltRounds = 10;
var shortid = require("shortid");
var db = require("../db");
var mail = require("../middlewares/mail.middleware");
var errors = [];

var wrongLoginCount = 0;
module.exports.login = function(req, res) {
  res.render("auth/login", {
    users: db.get("users").value(),
    values: req.body
  });
};

module.exports.postLogin = function(req, res) {
  var user = db
    .get("users")
    .find({ email: req.body.email })
    .value();
  var password = req.body.password;

  if (!user) {
    res.render("auth/login", {
      errors: ["Email does not exists"],
      values: req.body
    });
  }
  
   bcrypt.compare(req.body.password, user.password, function(err, result) {
    if (result === true) {
      res.cookie("userId", user.id, {signed : true});
      console.log("auth  ", req.signedCookies.userId);
      res.redirect("/");
    } else {
      wrongLoginCount++;
      if (wrongLoginCount <= 3) {
        errors = "Incorrect password";
        console.log("auth 1", wrongLoginCount);
      } else if (wrongLoginCount > 3) {
        errors = "You entered incorrect password over 3 times!";
        console.log("auth 2", wrongLoginCount);
        mail.sendWarnigMail();
      }
      res.render("auth/login", {
        errors: errors,
        values: req.body
      });
    }
  });
};