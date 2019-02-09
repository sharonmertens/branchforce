const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

// ROUTE TO DELETE SESSION
router.delete('/', (req, res) => {
  res.session.destroy(() => {
    res.status(200).json({
      status: 200,
      message: 'logout complete'
    });
  });
});

// ROUTE TO NEW SESSION
router.post('/', (req, res) => {
  console.log(req.body);
  User.findOne({username:req.body.username}, (err, foundUser) => {
    if(bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.username = foundUser.username;
      res.status(201).json({
        status: 201,
        message: 'session created'
      })
    } else {
      res.status(401).json({
        status: 401,
        message: 'login failed'
      });
    }
  });
});

module.exports = router;
