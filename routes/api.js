var express = require('express');
var router = express.Router();
const path = require('path');
const jf = require('jsonfile');
const async = require('async');

router.get('/dances', function (req, res, next) {
    var db = req.db;
    var collection = db.get('ballroom_dances');
    collection.findOne({}, {}, function (e, dances) {
        res.json(
            dances
        );
    });
});


router.get('/dance/:level/:category/:dance', function (req, res, next) {
    var db = req.db;
    var collection = db.get(req.params.category);
    collection.findOne({dance: req.params.dance}, function (e, stepList) {
        res.json(
            stepList
        )
    });
    /*
    res.json({
        level: req.query.level,
        category: req.query.category,
        dance: req.query.dance
    }); */
});

module.exports = router;