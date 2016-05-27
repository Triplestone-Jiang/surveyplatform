var express = require('express');
var router = express.Router();
var db = require('./db');
var arr = [];

router.get('/', function (req, res) {
    db.find(function (err, doc) {
        arr = doc;
        if (req.query.title) {
            for (var i = 0; i < arr.length; i++) {
                var o = JSON.parse(arr[i]['obj']);
                if (o['title'] === req.query.title) {
                    res.render('view', {obj: o});
                }
            }
        }
    });
});
module.exports = router;
