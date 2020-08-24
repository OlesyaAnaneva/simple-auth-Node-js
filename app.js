const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const indexRouter = require('./routes/index');
const regRouter = require('./routes/regRouter');
const db = require('./middleware/db')
const PORT = process.env.PORT || 5000

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());


app.use(
  session({
    store: new FileStore(),
    key: 'user_sid',
    secret: 'anything here',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 6000000,
    },
  }),
);


app.use((req, res, next) => {
  res.locals.isAuth = !!req.session.user;
  if (req.session.user) {
    res.locals.name = req.session.user.userName;
  }
  next();
});

app.use('/', indexRouter);
app.use('/auth', regRouter);

app.use((req, res, next) => {
  const err = new Error('Sorry, nothing found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  })
})

const server = app.listen(PORT, function () {
  console.log(`server is listening on port:  localhost:${server.address().port}`);
})

module.exports = app;
