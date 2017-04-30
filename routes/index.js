var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Ballroom Dance Choreographer'});
});

router.get('/:level/:category/:dance', function (req, res, next) {
    var db = req.db;

    res.json({
        level: req.query.level,
        category: req.query.category,
        dance: req.query.dance
    });
});

module.exports = router;
