// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
var express = require("express");
var app = express();
var bodyParser = require('body-parser')

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var todos= ["Đi chợ", "Nấu cơm", "Rửa bát", "Học code tại CodersX"];
// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.render("index");
});

app.get('/todos', (req, res) => {
  res.render('todos/index', {
    todos: todos
  });
});

app.get('/todos/search', (req, res) => {
  var q = req.query.q;
  console.log(q);
  
  var matchedItems = todos.filter(function(item){
    return item.toLowerCase().indexOf(q) !== -1;
  });
  
  res.render('todos/index', {
    todos: matchedItems
  });
});

app.get('/todos/create', (req,res) => {
  res.render('todos/create');
});

app.post('/todos/create', (req, res) => {
  //var data = req.body;
  todos.push(req.body.todo);
  res.redirect('/todos');
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
