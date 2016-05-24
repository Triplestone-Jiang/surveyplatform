var mongoose = require('mongoose');
var questionSchema = mongoose.Schema({
    title: String,
    len: number,
    Q1: object
});

var Questionnaire = mongoose.model('Questionnaire', questionSchema);
module.exports = Questionnaire;