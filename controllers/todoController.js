var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

// connect to the database
mongoose.connect('mongodb://test:test@ds139954.mlab.com:39954/iamyouralpha')

// creating a schema - this is the blueprint for your data
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);
var item1 = new Todo({item:'get coders'}).save(function(err){
  if(err) throw err;
  console.log('Item saved!');
});

//var data = [
//{item: 'Get Milk'},
//{item: 'walk dog'},
//{//item: 'keep coding'}
//];

module.exports = function(app){

app.get('/todo', function(req, res){
  // get data from the mongo db annd pass it to the view
  Todo.find({}, function(err, data){
    if(err) throw err;
    res.render('todo', {todos: data})
  })
  //res.render('todo', {todos: data});
});

app.post('/todo', urlencodedParser, function(req, res){
  // get data from the view and add it to the mongo db
  //data.push(req.body);
  var newTodo = new Todo(req.body).save(function(err, data){
    if(err) throw err;
    res.json(data);
  });
});

app.delete('/todo/:item', function(req, res){
  // delete the requested item from the mongo db
  Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
    if(err) throw err;
    res.json(data);
  });
});
};
