var express = require('express');
var router = express.Router();
const path = require('path');
const jf = require('jsonfile');
const async = require('async');
const request = require('request-promise');
var categories = [];
const options = {
    method: 'GET',
    json: true,
    uri: '127.0.0.1:3000/api/dances'
};

/* GET create page */
router.get('/', function (req, res, next) {
    res.render('create', {
        title: 'Create Routine',
        categories: categories,
    });
});

module.exports = router;