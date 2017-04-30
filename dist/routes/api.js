'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');
var jf = require('jsonfile');
var async = require('async');

router.get('/dances', function (req, res, next) {
    var db = req.db;
    var collection = db.get('dances');
    collection.find({}, {}, function (e, dances) {
        res.json(dances);
    });
});

module.exports = router;
//# sourceMappingURL=api.js.map