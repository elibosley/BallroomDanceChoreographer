var express = require('express');
var router = express.Router();
var path = require('path');
var jf = require('jsonfile');
let async = require('async');
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
    jf.readFile(path.join('public', 'data', 'filename_lookup.json'), function (err, obj) {
        if (obj[dance]) {
            stepDb = obj[dance];
            jf.readFile(path.join('public', 'data', stepDb), function (err, obj) {
                if (obj) {
                    console.log(obj);
                    return (obj);
                }
                else {
                    return (err);
                }
            });
        }
        else {
            return (Error("Step database not found for " + dance + ".\n"));
        }
    });
    return [];

}

/* GET create page */
router.get('/', function (req, res, next) {
    console.log(req.query['dance']);
    const dance = req.query['dance'];
    if (dance) {
        async.waterfall([
            function (callback) {
                let data = getSteps(dance);
                callback(null, data);
            }], function (err, result) {
            console.log(result);
            res.render('create', {
                title: 'Create Routine',
                levels: ['Newcomer', 'Bronze', 'Silver', 'Gold', 'Open'],
                categories: categories,
                steps: result
            });
        })

    }
    else {
        res.render('create', {
            title: 'Create Routine',
            levels: ['Newcomer', 'Bronze', 'Silver', 'Gold', 'Open'],
            categories: categories,
            steps: []
        });
    }

})
;

router.get(':danceId', function (req, res, next) {
    console.log(req.params.danceId);
    res.send("set dance to " + req.params.danceId)
});

module.exports = router;