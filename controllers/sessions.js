// ================ //
//   DEPENDENCIES   //
// ================ //
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

// ========== //
//   ROUTES   //
// ========== //
// DELETE SESSION
router.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({
      status: 200,
      message: 'logout complete'
    });
  });
});

//NEW SESSION
router.post('/', (req, res) => {
  console.log(req.body);
  User.findOne({username:req.body.username}, (err, foundUser) => {
    if(bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.currentUser = foundUser;
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

//SENDING OVER USER DATA
router.get('/',(req,res) => {
  if(req.session.currentUser){
    res.json(req.session.currentUser)
  }else{
    res.status(401).json({
      message:'not logged in'
    })
  }
})

module.exports = router;
