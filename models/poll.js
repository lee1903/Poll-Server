var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var pollSchema = new Schema({
    title: String,
    date: String,
    optionsCount: String,
    longitude: String,
    latitude: String,
    id: String,
    status: String,
    stats: Array,
    author: String
});
 
module.exports = mongoose.model('Poll', pollSchema);