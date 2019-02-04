var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishesRouter = require('./routes/dishesRouter');
var leaderRouter = require('./routes/leaderRouter');
var promoRouter = require('./routes/promoRouter');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');
const uploadRouter = require('./routes/uploadRouter');


var app = express();
app.all('*',(req, res, next) => {
    if(req.secure){
        return next();
    }
    else {
        res.redirect(307, 'https://'+req.hostname + ':' + app.get('secPort') + req.url);
    }
});

app.use(logger('dev'));
app.use(bodyParser.json());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('12345-56897-74851-96852'));
var config = require('./config');
const url = config.mongoUrl;
app.use('/imageUpload',uploadRouter);

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);


 /*
app.use(session({
    name: 'session-id',
    secret: '12345-56897-74851-96852',
    saveUninitialized: false,
    resave: true,
    store: new FileStore()
}));
app.use(passport.session());
function auth (req, res, next) {
    console.log(req.user);

    if (!req.user) {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      next(err);
    }
    else {
          next();
    }
}
function auth(req, res, next){
    console.log(req.session);
    if(!req.session.user){
        var authHeader = req.headers.authorization;

        if(!authHeader){
            var err = new Error('You are not authenticated');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            return next(err);

        }

        var auth = new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':');
        var username = auth[0];
        var password = auth[1];
        if(username === 'admin' && password === 'password'){
            // res.cookie('user','admin',{signed:true});
            req.session.user = 'admin';
            next();
        }
        else{
        }
    }
    else{
        if(req.session.user === 'admin'){
            next();
        }else{
            var err = new Error('You are not authenticated');
            err.status = 401;
            return next(err);
        }
    }
}
function auth(req, res, next){
    console.log(req.session);
    if(!req.session.user){
        var err = new Error('You are not authenticated');
        err.status = 401;
        return next(err);
    }else{
        if(req.session.user === 'authenticated'){
            next();
        }else{
            var err = new Error('You are not authenticated');
            err.status = 403;
            return next(err);
        }
    }
}
app.use(auth);
*/
app.use(express.static(path.join(__dirname, 'public')));

app.use('/dishes', dishesRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);

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

var mongoose = require('mongoose');
var mongoDB = process.env.MONGODB_URI || 'mongodb://localhost:27017/conFusion';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app;
