const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

// create a User Router with a route to post a new user
router.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (err, createdUser) => {
    res.status(201).json({
      status:201,
      message: "user created"
    });
  });
});

router.put('/:id',(req,res) => {
  const newTrip = {}
  User.findByIdAndUpdate(req.params.id, {$push:{trips:newTrip}}, {new:true},
  (err,data) => {
    if(err)console.log(err);
    res.status(202).json({
      status:202,
      message:"user information updated"
    })
  })
})

module.exports = router;
