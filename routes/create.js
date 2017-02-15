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


router.get('/:categoryId/:danceId', function (req, res) {
    const dance = req.params['danceId'];
    if (filenameLookup[dance]) {
        console.log('here!');
        jf.readFile(path.join('public', 'data', filenameLookup[dance]), function (error, stepData) {
            if (error) {
                console.log(error);
            }
            else {
                res.render('create', {
                    title: 'Create Routine',
                    levels: ['Newcomer', 'Bronze', 'Silver', 'Gold', 'Open'],
                    categories: categories,
                    steps: stepData
                });
            }
        });
    }
    else {
        res.send('no dance by name ' + dance)
    }
});


/* GET create page */
router.get('/', function (req, res, next) {
    console.log(req.query['dance']);
    const dance = req.query['dance'];
    if (dance && filenameLookup[dance]) {
        jf.readFile(path.join('public', 'data', filenameLookup[dance]), function (error, stepData) {
            if (error) {
                getStepsCallback(error);
            }
            else {
                res.render('create', {
                    title: 'Create Routine',
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