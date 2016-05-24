var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/test1');
var Schema = mongoose.Schema;
var questionSchema = new Schema({
    obj:String
});
var obj={};
var Question = mongoose.model('Question', questionSchema);
Question.find(function(err, doc,next) {
    obj=doc[0]['obj'];
    console.log(obj);
    obj=JSON.parse(obj);
});
router.get('/', function(req, res, next) {

    console.log(obj);
    res.render('edit', {obj:obj});
});
router.post('/',function (req,res) {
    var data=JSON.stringify(req.body);
    var obj=new Question();
    obj.obj=data;
    obj.save(function(err) {
        if (err) {
            console.log('保存失败');
            return;
        }
        console.log('meow');
    });
    res.send("ok");
});
module.exports = router;
