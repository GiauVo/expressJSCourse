var app = require('express')();
var bodyParser = require('body-parser');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var shortid = require('shortid');

var adapter = new FileSync('db.json');
var db = low(adapter);
var temp = '';
// Set some defaults (required if your JSON file is empty)
db.defaults({ books: [] })
  .write();

var port = 3000;

app.set('view engine', 'pug');
app.set('views','./views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/books', (req, res) => {
	res.render('books/index', {
		books: db.get('books').value()
	});
});

app.get('/books/create', function(req, res){
	res.render('books/create');
});

app.post('/books/create', function(req, res){
	req.body.id = shortid.generate();
	db.get('books').push(req.body).write();
	res.redirect('/books');
});

app.get('/books/:id/delete', function(req, res){
	var id = req.params.id;
	var matchedItem = db.get('books')
						.find({id: id })
						.value();
	db.get('books')
	  .remove({id: id, title: matchedItem.title, des: matchedItem.des })
	  .write()

	res.redirect('back');
});

app.get('/books/:id', function(req, res){
	var id = req.params.id;
	temp = id;
	var book = db.get('books').find({id: id }).value
	res.render('books/update', {
		book: book
	});	
});

app.post('/books/update', function(req, res){
	db.get('books')
	  .find({id: temp })
	  .assign({title: req.body.title})
	  .write()
	res.redirect('/books');
});

app.listen(port, () => {
	console.log('Hello my server is running on '+ port);
})