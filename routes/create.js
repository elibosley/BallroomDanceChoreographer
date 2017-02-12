var express = require('express');
var router = express.Router();
var path = require('path');
var jf = require('jsonfile');

var categories = [];
var dances = [];
jf.readFile(path.join('public', 'data', 'dances.json'), function (err, obj) {
    if (obj) {
        categories = obj
        console.log(categories)

    }
    else {
        console.log(err)
    }
});
/* GET create page */
router.get('/', function (req, res, next) {
    res.render('create', {
        title: 'Create Routine',
        levels: ['Newcomer', 'Bronze', 'Silver', 'Gold', 'Open'],
        categories: categories
    });
});

module.exports = router;