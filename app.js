var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var session = require('express-session');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var problemsRouter = require('./routes/problems');
var instructorRouter = require('./routes/instructors');
var checkresultRouter = require('./routes/checkresult');
var groupsRouter = require('./routes/groups');
var studentRouter = require('./routes/students');
var lessonRouter = require('./routes/lessons');
var answerRouter = require('./routes/answers');
var app = express();

app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get('*',function(req,res,next){
  res.locals.user = req.user || null;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/instructors', instructorRouter);
app.use('/problems',problemsRouter);
app.use('/checkresult', checkresultRouter);
app.use('/groups', groupsRouter);
app.use('/students', studentRouter);
app.use('/lessons', lessonRouter);
app.use('/answers', answerRouter);

module.exports = app;