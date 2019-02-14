// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');
const db = mongoose.connection;
<<<<<<< HEAD
require('dotenv').config();
=======
require('dotenv').config()
>>>>>>> 300869de65c9e64c2ea8d47e60d16d22be6199e3

// =======================================
//             CONFIGURATION
// =======================================
// Allow use of Heroku's port or your own local port, depending on the environment
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI

// middleware
app.use(express.json());
app.use(express.static('public'));

app.use(session({
  secret: 'brandforceforever',
  resave: false,
  saveUninitialized: false
}));


// Users controller
const userController = require('./controllers/users.js');
app.use('/users', userController);

// Sessions controller
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

// =======================================
//              LISTENER
// =======================================
app.listen(port, () => {
  console.log(`Branch Force App listening on port: ${port}`);
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));

// connect to mongoose
mongoose.connect(mongoURI, { useNewUrlParser: true});
mongoose.connection.once('open', () => {
  console.log('connected to mongoose...');
});
