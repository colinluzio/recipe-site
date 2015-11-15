var mongoose = require('mongoose');

var RecipeSchema = new mongoose.Schema({
  title: String,
  ingredients: [String]
});

mongoose.model('Recipe', RecipeSchema);