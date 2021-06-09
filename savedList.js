const mongoose = require('mongoose');
const {Schema} = mongoose;

const listSchema = new Schema({
    breakfast: String,
    lounch: String,
    dinner: String,
})

const SavedList = mongoose.model('SavedList', listSchema);

module.exports = SavedList;