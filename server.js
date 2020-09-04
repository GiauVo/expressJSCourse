// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");

var adapter = new FileSync("db.json");
var db = low(adapter);

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/todos", (req, res) => {
  res.render("todos/index", {
    todos: db.get("todos").value()
  });
});

app.get("/todos/search", (req, res) => {
  var q = req.query.q;

  var matchedItems = db
    .get("todos")
    .value()
    .filter(function(item) {
      return item.text.toLowerCase().indexOf(q) !== -1;
    });

  res.render("todos/index", {
    todos: matchedItems
  });
});

app.get("/todos/create", (req, res) => {
  res.render("todos/create");
});

app.post("/todos/create", (req, res) => {
  var id = db
    .get("todos")
    .size()
    .value();
  db.get("todos")
    .push({ id: id++, text: req.body.todo })
    .write();
  res.redirect("/todos");
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
