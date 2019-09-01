var mongoose = require('mongoose');

var makemodelSchema = new mongoose.Schema({
    "make":String,
    "model":String
});

module.exports = mongoose.model('MakeModel',makemodelSchema,'makemodel');