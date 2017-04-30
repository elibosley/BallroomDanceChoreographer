'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require("fs");

var routes = require('./routes/index');
var users = require('./routes/users');
var create = require('./routes/create');
var api = require('./routes/api');

var app = express();

// Database Setup
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/ballroom-data');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Make our db accessible to our router
app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true,
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/materialize-css/dist/js')); // redirect materialize JS
app.use('/css', express.static(__dirname + '/node_modules/materialize-css/dist/css')); // redirect materialize CSS
app.use('/fonts', express.static(__dirname + '/node_modules/materialize-css/dist/fonts/')); // redirect fonts
//TODO add font usage for materialize here


app.use('/', routes);
app.use('/users', users);
app.use('/create', create);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
//# sourceMappingURL=app.js.map