var express = require("express");
var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');

var router = express.Router();
/*---- User's CRUD ---*/
//index --> view user's list infor
router.get("/", controller.index);
//create
router.get("/create", controller.create);
router.post("/create", validate.postCreate, controller.postCreate);
//delete
router.get("/:id/delete", controller.delete);
//update
router.get("/:id", controller.update);
router.post("/update", controller.postUpdate);

module.exports = router;
