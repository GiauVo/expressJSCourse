var express = require("express");
var bodyParser = require("body-parser");

var bookRoute = require("./routes/book.route");
var userRoute = require("./routes/user.route");
var transactionRoute = require("./routes/transaction.route");

var port = 3000;

var app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//Home page ^^
app.get("/", (req, res) => {
  res.render("index");
});

app.use("/books", bookRoute);
app.use("/users", userRoute);
app.use("/transactions", transactionRoute);

app.listen(port, () => {
  console.log("Hello my server is running on " + port);
});
