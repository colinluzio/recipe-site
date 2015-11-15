var mongoose = require('mongoose');
require('./models/Ingredients');
require('./models/Recipes');

mongoose.connect('mongodb://localhost/recipes');
var express = require('express');
var router = express.Router();
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Ingredients = mongoose.model('Ingredients');
var Recipe = mongoose.model('Recipe');

var app = express();

var routes = require('./routes');
//var users = require('./routes/user');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//router.get('/ingredients', function(req, res, next) {
//  Ingredients.find(function(err, posts){
//    if(err){ return next(err); }
//
//    res.json(posts);
//  });
//});
//router.post('/ingredients', function(req, res, next) {
//
//  var ingredient = new Ingredient(req.body);
//
//  ingredient.save(function(err, ingredient){
//    if(err){ return next(err); }
//
//    res.json(ingredient);
//  });
//});
app.use(app.router);

// Add callback handler for home (/) route
app.get('/ingredients', function(req, res,next) {
    Ingredients.find(function(err, posts){
    if(err){ return next(err); }

    res.json(posts);
  });
});
app.post('/ingredients', function(req, res, next) {

  var ingredient = new Ingredients(req.body);

  ingredient.save(function(err, ingredient){
    if(err){ return next(err); }

    res.json(ingredient);
  });
});
app.get('/recipes', function(req, res,next) {
    Recipe.find(function(err, posts){
    if(err){ return next(err); }

    res.json(posts);
  });
});

app.get('/recipe/:id', function(req, res) {
  
  Recipe.find({"ingredients":req.params.id},function(err, recipe){
      if(err)
      res.send(err);
  
      res.json(recipe);
  })
});
//app.param('recipe', function(req, res, next, id) {
//  var query = Recipe.findById(id);
//
//  query.exec(function (err, post){
//    if (err) { return next(err); }
//    if (!post) { return next(new Error('can\'t find post')); }
//
//    req.post = post;
//    return next();
//  });
//});
//app.use('/', router);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));

//app.use(app.router);

app.get('/', routes.index);
//app.get('/users', users.list);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};