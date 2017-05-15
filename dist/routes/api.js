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

router.get('/dance/:level/:category/:dance', function (req, res, next) {
    //TODO Add level filtering to this query
    var db = req.db;
    var collection = db.get(req.params.category);
    collection.findOne({ dance: req.params.dance }, function (e, stepList) {
        res.json(stepList);
    });
});

module.exports = router;
//# sourceMappingURL=api.js.map