var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require("fs");
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var create = require('./routes/create');
var api = require('./routes/api');

var configDB = require('./config/database.js');

var app = express();

// Database Setup
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(configDB.url);

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'pug');

// Make our db accessible to our router
app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.use(favicon(path.join(__dirname, 'app/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true,
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, '/app/images')));
app.use(express.static(path.join(__dirname, '/app/js')));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/sortablejs'));
app.use('/js', express.static(__dirname + '/node_modules/materialize-css/dist/js')); // redirect materialize JS
app.use('/css', express.static(__dirname + '/node_modules/materialize-css/dist/css')); // redirect materialize CSS
app.use('/fonts', express.static(__dirname + '/node_modules/materialize-css/dist/fonts/')); // redirect fonts

// required for passport
app.use(session({
    secret: "tempPassportSecret",
    proxy: true,
    resave: true,
    saveUninitialized: true
})); // session secret TODO change to config for passport secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ==============================================================================================================
app.use('/', routes);
app.use('/users', users);
app.use('/create', create);
app.use('/api', api);


// error handlers ======================================================================================================

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

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
