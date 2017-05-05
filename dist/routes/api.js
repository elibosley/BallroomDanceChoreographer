'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');
var jf = require('jsonfile');
var async = require('async');

router.get('/dances', function (req, res, next) {
    var db = req.db;
    var collection = db.get('ballroom_dances');
    collection.findOne({}, {}, function (e, dances) {
        res.json(dances);
    });
});

router.get('/:category/:dance', function (req, res, next) {
    var db = req.db;
    console.log(req.params.level);
    var collection = db.get(req.params.category);
    collection.findOne({ dance: req.params.dance }, { steps: 1 }, function (e, stepList) {
        res.json(stepList);
    });
    /*
    res.json({
        level: req.query.level,
        category: req.query.category,
        dance: req.query.dance
    }); */
});

module.exports = router;
//# sourceMappingURL=api.js.map