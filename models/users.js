const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
    },
  password: {
    type: String,
    required: true
    },
<<<<<<< HEAD
<<<<<<< HEAD
  budget: Number,
=======
  budget: {
    type: Number,
    default: 0
  },
>>>>>>> 580b93540184468190cf1e7d1a0b89db414a8034
  trips: [{
    overallPrice: Number,
    hotel: {
      hotelName: String,
      hotelPrice: Number,
      hotelLocation: String,
      hotelCheckin: Date,
      hotelCheckout:Date
    },
    flight: {
      airline: String,
      flightPrice: Number,
      startLocation: String,
      destination: String,
      departureDay: Date,
      returnDay: Date
    },
    activities: [{
      activitiesName: String,
      activitiesTime: Number,
      activitiesDate: Date,
      activitiesPrice: Number
    }]
  }]
})

const User = mongoose.model('User', userSchema)

module.exports = User
