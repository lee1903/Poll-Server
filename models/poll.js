var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var pollSchema = new Schema({
    title: String,
    date: String,
    optionsCount: Number,
    longitude: Number,
    latitude: Number
});
 
module.exports = mongoose.model('Poll', pollSchema);