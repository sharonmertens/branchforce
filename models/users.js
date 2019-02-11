const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username:
    {
    type:String,
    required:true
    },
  password:
    {
    type:String,
    required:true
    },
  budget:Number,
  trips: [{
    overallPrice: Number,
    hotel: {
      hotelName: String,
      hotelPrice: Number,
      hotelLocation: String,
      hotelDates: [Date]
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
})

const User = mongoose.model('User', userSchema)

module.exports = User
