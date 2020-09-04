var express = require("express");
var shortid = require("shortid");

var db = require("../db");

var router = express.Router();
var temp = "";
/*---- User's CRUD ---*/
//index --> view user's list infor
router.get("/", (req, res) => {
  res.render("users/index", {
    users: db.get("users").value()
  });
});
//create
router.get("/create", function(req, res) {
  res.render("users/create");
});

router.post("/create", function(req, res) {
  req.body.id = shortid.generate();
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
});
//delete
router.get("/:id/delete", function(req, res) {
  var id = req.params.id;
  db.get("users")
    .remove({ id })
    .write();
  res.redirect("back");
});
//update
router.get("/:id", function(req, res) {
  var id = req.params.id;
  temp = id;
  var user = db.get("users").find({ id: id }).value;
  res.render("users/update", {
    user: user
  });
});

router.post("/update", function(req, res) {
  db.get("users")
    .find({ id: temp })
    .assign({ name: req.body.name, info: req.body.info })
    .write();
  res.redirect("/users");
});

module.exports = router;
