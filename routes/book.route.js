var express = require("express");
var controller = require('../controllers/book.controller');

var router = express.Router();
//list of books
router.get("/", controller.index);
//create
router.get("/create", controller.create);
router.post("/create", controller.postCreate);
//delete
router.get("/:id/delete", controller.delete);
//update
router.get("/:id", controller.update);
router.post("/update", controller.postUpdate);

module.exports = router;
