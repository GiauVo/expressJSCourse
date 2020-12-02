var express = require("express");
var controller = require('../controllers/transaction.controller');

var router = express.Router();
//list of transactions
router.get("/", controller.index);
//create
router.get("/create", controller.create);
router.post("/create", controller.postCreate);
//complete
router.get("/:transId/complete", controller.complete);

module.exports = router;