require('dotenv').config();
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  instructions: [String],
  image: String,
  category: String,
  source: String,
  url: String,
  rating: Number,

});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;