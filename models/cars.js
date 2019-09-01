var mongoose = require('mongoose');

var carsSchema = new mongoose.Schema({
    "reg_number":String,
    "make":String,
    "model":String,
    "year":String,
    "power_window":String,
    "auto":String,
    "chauffeur": String,
    "status":String
});

module.exports = mongoose.model('Cars',carsSchema,'Cars');