var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');



//initialize mongoose schemas
require('./models/models');
var useCtrl = require('./routes/useCtrl');
var ordCtrl = require('./routes/ordCtrl');
var proCtrl = require('./routes/proCtrl');
var authenticate = require('./routes/authenticate')(passport);
var mongoose = require('mongoose');                         //add for Mongo support
mongoose.connect('mongodb://localhost/shop');              //connect to Mongo
var app = express();




app.use(logger('dev'));
app.use(session({
    secret: 'keyboard cat',
    name: 'itsname',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', authenticate);
app.use('/useCtrl', useCtrl);
app.use('/ordCtrl', ordCtrl);
app.use('/proCtrl', proCtrl);


var initPassport = require('./passport-init');
initPassport(passport);

app.listen(7000);
console.log('7000');
