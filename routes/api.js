var express = require('express');
var router = express.Router();
const path = require('path');
const jf = require('jsonfile');
const async = require('async');

router.get('/dances', function (req, res, next) {
    var db = req.db;
    var collection = db.get('dances');
    collection.find({}, {}, function (e, dances) {
        res.json(
            dances
        );
    });
});

module.exports = router;