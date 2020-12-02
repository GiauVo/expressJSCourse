var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

var bookRoute = require("./routes/book.route");
var userRoute = require("./routes/user.route");
var transactionRoute = require("./routes/transaction.route");
var authRoute = require("./routes/auth.route");

var cookieMiddleware =  require("./middlewares/cookie.middleware");
var authMiddleware = require("./middlewares/auth.middleware");

require("dotenv").config();

var nodemailer = require("nodemailer");


var port = 3000;

var app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static('public'))

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser('abcdz32y287t34wtrusg'));


//Home page ^^
app.get("/", authMiddleware.requireAuth,  (req, res) => {   
  res.render("index");  
  //console.log(req.cookies);
});


app.use("/books", authMiddleware.requireAuth, bookRoute);
app.use("/users", authMiddleware.requireAuth, userRoute);
app.use("/transactions", authMiddleware.requireAuth, transactionRoute);
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log("Hello my server is running on " + port);
});