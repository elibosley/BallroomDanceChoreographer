'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');
var jf = require('jsonfile');
var async = require('async');
var request = require('request-promise');
var categories = [];
var options = {
    method: 'GET',
    json: true,
    uri: '127.0.0.1:3000/api/dances'
};

/* GET create page */
router.get('/', function (req, res, next) {
    res.render('create', {
        title: 'Create Routine',
        categories: categories
    });
});

module.exports = router;
//# sourceMappingURL=create.js.map