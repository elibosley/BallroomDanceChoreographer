var express = require('express');
var router = express.Router();
const path = require('path');
const jf = require('jsonfile');
const async = require('async');
var categories = [];
var dances = [];
const filenameLookup = {
    "Cha-Cha": "cha_cha.json"
};

jf.readFile(path.join('public', 'data', 'dances.json'), function (err, obj) {
    if (obj) {
        categories = obj;
        console.log(categories)

    }
    else {
        console.log(err)
    }
});

/* GET create page */
router.get('/:level?:category?:dance?', function (req, res, next) {
    /* res.json({
     level: req.query.level,
     category: req.query.category,
     dance: req.query.dance
     }); */
    console.log("level: " + req.query['level'] + " dance: " + req.query['dance'] + " category: " + req.query['category']);
    const dance = req.query['dance'];
    if (dance && filenameLookup[dance]) {
        jf.readFile(path.join('public', 'data', filenameLookup[dance]), function (error, stepData) { //TODO Replace this with a DB read
            if (error) {
                getStepsCallback(error);
            }
            else {
                res.render('create', {
                    title: 'Create ' + dance + ' Routine',
                    levels: ['Newcomer', 'Bronze', 'Silver', 'Gold', 'Open'],
                    categories: categories,
                    steps: stepData
                });
            }
        });

    }
    else {
        res.render('create', {
            title: 'Create Routine',
            levels: ['Newcomer', 'Bronze', 'Silver', 'Gold', 'Open'],
            categories: categories,
            steps: []
        });
    }

});

router.get(':danceId', function (req, res, next) {
    console.log(req.params.danceId);
    res.send("set dance to " + req.params.danceId)
});

module.exports = router;