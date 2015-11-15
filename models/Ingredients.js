var mongoose = require('mongoose');

var IngredientSchema = new mongoose.Schema({
  title: String,
  ingredients: Array
});

mongoose.model('Ingredients', IngredientSchema);