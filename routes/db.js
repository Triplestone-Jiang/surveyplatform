var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/test1');
var Schema = mongoose.Schema;
var questionSchema = new Schema({
    obj:String
});

var Question = mongoose.model('Question', questionSchema);

module.exports=Question;