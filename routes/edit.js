var express = require('express');
var router = express.Router();
var db = require('./db');
var arr = [];
db.find(function (err, doc) {
    arr = doc;
});
router.get('/', function (req, res) {
    db.find(function (err, doc) {
        arr = doc;
        if (req.query.title) {
            for (var i = 0; i < arr.length; i++) {
                var o = JSON.parse(arr[i]['obj']);
                if (o['title'] === req.query.title) {
                    res.render('edit', {obj: o});
                }
            }
        } else {
            res.render('edit', {obj: {title: "A New Questionnaire"}});
        }
    });

});
router.post('/', function (req, res) {
    db.find(function (err, doc) {
        arr = doc;
        var title = req.body['title'];
        arr.forEach(function (item) {
            if (title === JSON.parse(item['obj'])['title'].trim()) {
                db.remove({'obj': item['obj']});
            }
        });
        var data = JSON.stringify(req.body);
        var obj = new db();
        obj.obj = data;
        obj.save(function (err) {
            if (err) {
                console.log('failure');
            }
        });
        res.send("OK");
    });
});
module.exports = router;
