// installed 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let indexRouter = require('./routes/index');
let adminRouter = require('./routes/admin');
const mongoose = require("mongoose");
const appSession = require("express-session");
const dbURL=require('./db/db.config');
let app = express();
app.use(
  appSession({
      secret: "#8#!]&>4}'@{_:/}",
      saveUninitialized: true,
      cookie: { maxAge: 86400 },
      resave: false,
  })
);
app.use(function(req, res, next) {
  res.locals.admin = req.session.admin;
  next();
});
//db connection
mongoose.connect(dbURL.dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Database Connection Generated Error: "));
db.once("open", function() {
  console.log("Database Connection Made Successfully.");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // express -e

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', indexRouter);
function validationAdminArea(req, res, next) {
  if (req.session.admin) {
      next();
  } else {
      res.redirect("/login");
  }
}

app.all("/admin/*", validationAdminArea, function(req, res, next) {
  next();
});
app.use('/admin', adminRouter);

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
  res.render('error', { title: 'Error'});
});

module.exports = app;
