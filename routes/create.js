var express = require('express');
var router = express.Router();

/* GET create page */
router.get('/', function (req, res, next) {
    console.log("Got request for create");
    res.render('create', {
        title: 'Create Routine',
        levels: ['Newcomer', 'Bronze', 'Silver', 'Gold', 'Open'],
        categories: ['Latin', 'Rhythm', 'Smooth', 'Standard'],
        events: ['Cha Cha']
    });
});

module.exports = router;