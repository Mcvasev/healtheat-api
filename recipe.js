const mongoose = require('mongoose');
const {Schema} = mongoose;

const recipeSchema = new Schema({
    type: String,
    title: String,
    description: String,
    ingredients: Array
})

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;