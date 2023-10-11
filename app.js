var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//khai bao
var studentRouter = require('./routes/student');

var app = express();

//khaibao
var hbs = require('hbs');
hbs.registerHelper('equal', require('handlebars-helper-equal'))

//khai bao
var hbs = require('hbs');
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));

//khai bao
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false}))
//khai bao
var uri = "mongodb+srv://tuantcsl1232:jungong3@webgreenwich.pkmn1y7.mongodb.net/gch1005";
mongoose.connect(uri)
    .then(() => console.log('Connect to db ok'))
    .catch((err) => console.log())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/student', studentRouter);

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

//khai bao port
app.listen(process.env.PORT || 3001);

module.exports = app;
