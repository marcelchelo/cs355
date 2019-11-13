'use strict';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var coursesRouter = require('./routes/courses');

var app = express();

//whitelisting frontend request URL
const cors = require("cors");
app.use(cors({
  origin: 'http://localhost:3000'
}));

//setting up authentication
const passport = require("passport");
passport.use(passport.initialize());
require('./auth');

//setup connection to database here
const mongoose = require('mongoose');

//Set up default mongoose connection
const mongoDBurl = process.env.MONGODB_URL || 'mongodb://localhost:27017/cs355';

mongoose.connect(mongoDBurl, { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.error("FAILED TO CONNECT TO DB");
      console.error(err);
      return;
    }
    console.log("SUCCESSFULLY CONNECTED TO DEPLOSION DB");
  });

//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// DB setup complete

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', coursesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
