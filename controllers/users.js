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

// Removing a trip from the user
router.put('/remove/:id',(req,res) => {
  console.log(req.body._id);
  User.findByIdAndUpdate(req.params.id, {$pull:{trips:{_id:req.body._id}}},
  {new:true},(err,data) => {
    if(err){console.log(err);}
    res.status(202).json({
      status:202,
      message: "Trip successfully removed"
    })
  })
})

router.put('/budget/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, {$set:{budget:req.body.budget}}, {new:true}, (error, data) => {
    if(error)console.log(error);
  })
})

router.put('/change/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, {$set:{budget:req.body.budget}}, {new:true}, (error, data) => {
    if(error)console.log(error);
  })
})


// Adding a trip to the user

router.put('/:id',(req,res) => {
  // formating the data
  const newTrip = {};
  newTrip.hotel = {};
  newTrip.flight = {};
  newTrip.activities = [];

  let sum = 0;
  for (let i = 0; i < req.body.length; i++) {
    sum = req.body[i].price + sum
    if(req.body[i].type === 'flight'){
      newTrip.flight.airline = req.body[i].title
      newTrip.flight.flightPrice = req.body[i].price
      newTrip.flight.destination = req.body[i].location
    }
    if(req.body[i].type === 'hotel'){
      newTrip.hotel.hotelName = req.body[i].title
      newTrip.hotel.hotelPrice = req.body[i].price
      newTrip.hotel.hotelLocation = req.body[i].location
    }
    if(req.body[i].type === 'activity'){
      let obj = {}
      obj.activitiesName = req.body[i].title
      obj.activitiesPrice = req.body[i].price
      newTrip.activities.push(obj)
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
