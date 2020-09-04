var app = require("express")();
var bodyParser = require("body-parser");
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var shortid = require("shortid");

var adapter = new FileSync("db.json");
var db = low(adapter);
var temp = "";
// Set some defaults (required if your JSON file is empty)
db.defaults({ books: [] , users: []}).write();

var port = 3000;

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//Home page ^^
app.get("/", (req, res) => {
  res.render("index");
});
//list of books
app.get("/books", (req, res) => {
  res.render("books/index", {
    books: db.get("books").value()
  });
});
//crreate
app.get("/books/create", function(req, res) {
  res.render("books/create");
});

app.post("/books/create", function(req, res) {
  req.body.id = shortid.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("/books");
});
//delete
app.get("/books/:id/delete", function(req, res) {
  var id = req.params.id;
  db.get("books")
    .remove({ id })
    .write();

  res.redirect("back");
});
//update
app.get("/books/:id", function(req, res) {
  var id = req.params.id;
  temp = id;
  var book = db.get("books").find({ id: id }).value;
  res.render("books/update", {
    book: book
  });
});

app.post("/books/update", function(req, res) {
  db.get("books")
    .find({ id: temp })
    .assign({ title: req.body.title })
    .write();
  res.redirect("/books");
});

/*---- User's CRUD ---*/
//index --> view user's list infor
app.get("/users", (req, res) => {
  res.render("users/index", {
    users: db.get("users").value()
  });
});
//create
app.get("/users/create", function(req, res) {
  res.render("users/create");
});

app.post("/users/create", function(req, res) {
  req.body.id = shortid.generate();
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
});
//delete
app.get("/users/:id/delete", function(req, res) {
  var id = req.params.id;
  db.get("users")
    .remove({ id })
    .write();
  res.redirect("back");
});
//update
app.get("/users/:id", function(req, res) {
  var id = req.params.id;
  temp = id;
  var user = db.get("users").find({ id: id }).value;
  res.render("users/update", {
    user: user
  });
});

app.post("/users/update", function(req, res) {
  db.get("users")
    .find({ id: temp })
    .assign({ name: req.body.name, info: req.body.info })
    .write();
  res.redirect("/users");
});

app.listen(port, () => {
  console.log("Hello my server is running on " + port);
});
