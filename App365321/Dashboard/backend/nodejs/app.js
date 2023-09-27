const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const session = require('express-session');
const MongoSession = require('connect-mongodb-session')(session);
const csrf = require('csurf');
// const flash = require('connect-flash');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
  next();
});

const MONGODB_URI =`mongodb+srv://isaac9sharing:2wEuKPS8amT15EHa@cluster00.qc55mjf.mongodb.net/mern0?retryWrites=true&w=majority`;



app.set('view engine', 'ejs');
app.set('views', 'view');


const authRoutes = require('./routes/auth');

app.use(authRoutes);



mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(4000);
  })
  .catch(err => {
    console.log(err);
  });