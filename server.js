// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

var todoList = [
  "Đi chợ",
      "Nấu cơm",
      "Ăn cơm",
      "Rửa chén",
      "Thức dậy, lên CodersX học Code"
]
// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.render("index",{
    name: "Giau"
  });  
});

app.get("/todos", (req, res) => {
  var q = req.query.q;
  var matchedItems = todoList.filter(function(item){
    return item.toLowerCase().indexOf(q) !== -1;
  })
  res.render("todos/index", {
    todoList: matchedItems
  });
});
// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
