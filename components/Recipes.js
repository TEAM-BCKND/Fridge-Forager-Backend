
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
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