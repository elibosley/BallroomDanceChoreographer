var express = require('express');
var router = express.Router();
var path = require('path');
var jf = require('jsonfile');

var categories = [];
var dances = [];

jf.readFile(path.join('public', 'data', 'dances.json'), function (err, obj) {
    if (obj) {
        categories = obj;
        console.log(categories)

    }
    else {
        console.log(err)
    }
});

/**
 * Function used to
 * @param dance
 */
function getSteps(dance) {
    let stepDb = "";
    var steps = [];
    jf.readFile(path.join('public', 'data', 'filename_lookup.json'), function (err, obj) {
        if (obj[dance]) {
            stepDb = obj[dance];
            jf.readFile(path.join('public', 'data', stepDb), function (err, obj) {
                if (obj) {
                    console.log(obj);
                    steps = obj;
                }
                else {
                    console.log(err);
                }
            });
        }
        else {
            console.log("Step database not found for " + dance + ".\n" + err);
            return [];
        }
    });
    return steps;
}
/* GET create page */
router.get('/', function (req, res, next) {
    console.log(req.query['dance']);
    var steps = getSteps(req.query['dance']);
    console.log(steps);
    res.render('create', {
        title: 'Create Routine',
        levels: ['Newcomer', 'Bronze', 'Silver', 'Gold', 'Open'],
        categories: categories,
        steps: steps
    });

});

router.get(':danceId', function (req, res, next) {
    console.log(req.params.danceId);
    res.send("set dance to " + req.params.danceId)
});

module.exports = router;