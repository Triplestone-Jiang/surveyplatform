var express = require('express');
var router = express.Router();
var db = require('./db');
var titles = [];
var obj;

router.get('/', function (req, res) {
    titles = [];
    db.find(function (err, doc) {
        obj = doc;
        doc.forEach(function (item) {
            titles.push(JSON.parse(item['obj'])['title'])
        });
        res.render('index', {questionList: titles});
    });

});
router.post('/', function (req, res) {
    db.find(function (err, doc) {
        obj = doc;
        var data = req.body;
        data.forEach(function (item) {
            obj.forEach(function (item1) {
                if (item === JSON.parse(item1['obj'])['title'].trim()) {
                    db.remove({'obj': item1['obj']});
                }
            })
        });
    });

    res.send("ok");
});
module.exports = router;
