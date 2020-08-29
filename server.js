// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views', './views');
// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/todos', (req, res) => {
  res.render('todos/index', {
    todos: ['Đi chợ','Nấu cơm', 'Rửa bát', 'Học code tại CodersX']
  });
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log('Server listening on port ' + process.env.PORT);
});
