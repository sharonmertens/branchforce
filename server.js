// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const port = 3000;
const bcrypt = require('bcrypt');

// middleware
app.use(express.json());
app.use(express.static('public'));

app.use(session({
  secret: 'branchforceforever',
  resave: false,
  saveUninitialized: false
}));

app.get('/mytrips', (req, res) => {
  if(req.session.currentUser){
      res.json(req.session.currentUser)
  } else {
      res.status(401).json({
        status: 401,
        message: 'User not logged in!'
      })
  }
})

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

// connect to mongoose
mongoose.connect('mongodb://localhost:27017/branchforce', { useNewUrlParser: true});
mongoose.connection.once('open', () => {
  console.log('connected to mongoose...');
});
