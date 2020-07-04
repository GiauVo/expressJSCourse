// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

const bodyParser = require('body-parser');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.render("index",{
    name: "Giau"
  });  
});

app.get("/todos", (req, res) => {
  res.render("todos/index", {
    todoList: db.get("todos").value()
  });
});

app.get("/todos/search", (req, res) => {
  var q = req.query.q;
  var matchedItems = db.get("todos").value().filter(function(item){
    return item.text.toLowerCase().indexOf(q) !== -1;
  })
  
  res.render("todos/search", {
    value: 1,
    todoList: matchedItems
  });  
});

app.get('/todos/create', function(req, res){
  res.render('todos/create');
})

app.post('/todos/create', function (req, res) {
  var count = db.get('todos').size().value();
  db.get('todos').push({ id: ++count, text: req.body.todo}).write();
  res.redirect('back');
})

app.get('/todos/:id/delete', function(req, res){
  var id = parseInt(req.params.id);
  var matchedItem = db.get('todos')
                      .find({id: id })
                      .value();
  db.get('todos')
    .remove({id: id, text: matchedItem.text })
    .write()
  res.redirect('back');
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
