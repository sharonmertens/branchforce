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
  // formating the data
  const newTrip = {};
  newTrip.hotel = {};
  newTrip.flight = {};
  newTrip.activites = [];
  const obj = {}
  let sum = 0;
  for (let i = 0; i < req.body.length; i++) {
    sum = req.body[i].price + sum
    if(req.body[i].type === 'flight'){
      newTrip.flight.airline = req.body[i].title
      newTrip.flight.flighPrice = req.body[i].price
      newTrip.flight.destination = req.body[i].location
    }
    if(req.body[i].type === 'hotel'){
      newTrip.hotel.hotelName = req.body[i].title
      newTrip.hotel.hotelPrice = req.body[i].price
      newTrip.hotel.hotelLocation = req.body[i].location
    }
    if(req.body[i].type === 'activity'){
      obj.activitieName = req.body[i].title
      obj.activitiePrice = req.body[i].price
      newTrip.activites.push(obj)
    }
  }

  newTrip.overallPrice = sum

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
