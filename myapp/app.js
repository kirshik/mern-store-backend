const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// not initial imports // refactoring process
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require("express-session");
//---------------------//



const categoriesRouter = require('./routes/categories');
const productRouter = require('./routes/products');
const signInRouter = require('./routes/signIn');
const cartRouter = require('./routes/cart');
const userRouter = require('./routes/user');
const searchRouter = require('./routes/search');
const orderRouter = require('./routes/order');

// const signOutRouter = require('./routes/signOut');
// const wishListRouter = require('./routes/wishList');

const app = express();
const db = require('./database/database.js');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// refactoring process
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "DELETE"],
  credentials: true
}));
//---------------------//

// refactoring process
app.use(
  session({
    name: "userID",
    secret: "GFGEnter", // Secret key,
    saveUninitialized: false,
    resave: true,
    cookie: { httpOnly: false }
  })
);
//---------------------//

db.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});



app.use('/api/products', productRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/sign-in', signInRouter);
app.use('/api/cart', cartRouter);
app.use('/api/user', userRouter);
app.use('/api/search', searchRouter);
app.use('/api/order', orderRouter);
// app.use('/api/sign-out', signOutRouter);
// app.use('/api/wish-list', wishListRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
