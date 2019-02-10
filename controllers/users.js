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


// Sending avaliable trip info back to the user
const avaliableTrips = require('../models/trips.js');
router.get('/trips/:location',(req,res) => {
  res.json(avaliableTrips.filter((trip) => {
    return trip.location === req.params.location
  }))
})





module.exports = router;
