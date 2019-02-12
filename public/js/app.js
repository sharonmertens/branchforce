const app = angular.module('TripApp', []);

// ========================= //
//      TRIP CONTROLLER      //
// ========================= //
app.controller('TripController', ['$http', '$timeout', function($http, $timeout){
  const tripCtrl = this;
  this.includePath = "partials/home.html"

  this.changeInclude = function (path) {
    tripCtrl.includePath = 'partials/'+path+'.html'
  }

  // user is searching for flights and Hotels
  // this.departureDate = new Date(2019, 02, 20);
  this.populatePage = function () {
    $http({
      method:'GET',
      url:'/users/trips/' + this.location
    }).then(function (res) {
      tripCtrl.listOfDestinations = res.data
      console.log(res.data);
    },function (err) {
      console.log(err);
    })
  }

  // user stores their trip data
  this.bookmarkedTrip = []

  // only adds one flight and hotel
  this.storeData = function (trip) {
    let found = false
    for (let i = 0; i < tripCtrl.bookmarkedTrip.length; i++) {
      if(tripCtrl.bookmarkedTrip[i].type === trip.type){
        found = true
        tripCtrl.bookmarkedTrip[i] = trip;
      }
    }
    if(found === false){
      tripCtrl.bookmarkedTrip.push(trip)
    }
    console.log(tripCtrl.bookmarkedTrip);
  }

  // adds events
  this.addEvent = function (event) {
    let found = false
    for (let i = 0; i < tripCtrl.bookmarkedTrip.length; i++) {
      if(tripCtrl.bookmarkedTrip[i].title === event.title){
        found = true
      }
    }
    if(found === false){
      tripCtrl.bookmarkedTrip.push(event)
    }
  }

  // adds the total trip cost
  this.total = function () {
    let sum = 0;
    for (let i = 0; i < tripCtrl.bookmarkedTrip.length; i++) {
      sum = tripCtrl.bookmarkedTrip[i].price + sum
    }
    return sum
  }

  // Add a trip to the user's Trips
  this.addTripToUser = function (id) {
    $http({
      method:'PUT',
      url:'/users/' + id,
      data: this.bookmarkedTrip
    }).then(function (res) {

      console.log(res);
      tripCtrl.bookmarkedTrip = []
      tripCtrl.location = 'a'
      tripCtrl.populatePage()

    },function (err) {
      console.log(err);
    })
    return true
  }


  // =============================== //
  //   ADD FUNDS AND CREATE BUDGET   //
  // =============================== //
  // this.budget = 0

  this.addFunds = (id) => {

    console.log(id);
    $http({
      method:'PUT',
      url: '/users/budget/' + id,
      data: {
        budget: tripCtrl.budget
      }
    }).then(function(response){
      console.log('Success');

    }, function(error){
      console.log(error);
    })
    return true
  }


  // Image Carousel / Slideshow
  //Image list
  this.images = [];

  this.images[0] = '/images/slideshow/bali.jpeg';
  this.images[1] = '/images/slideshow/dubai.jpeg';
  this.images[2] = '/images/slideshow/hawaii.jpeg';
  this.images[3] = '/images/slideshow/london.jpeg';
  this.images[4] = '/images/slideshow/paris.jpeg';
  this.images[5] = '/images/slideshow/telaviv.jpeg';
  this.images[6] = '/images/slideshow/tokyo.jpeg';
  this.imageIndex = 0;

  this.changeImg = function () {

      tripCtrl.imageSource = tripCtrl.images[tripCtrl.imageIndex]; // setting the value of the source to the first image
      tripCtrl.imageIndex ++;
      if (tripCtrl.imageIndex > tripCtrl.images.length - 1) {
        tripCtrl.imageIndex = 0;
      }
      $timeout(tripCtrl.changeImg, 3000)
  }
  this.changeImg();

}])

// ================================== //
//      AUTHORIZATION CONTROLLER      //
// ================================== //
app.controller('AuthController', ['$http', function($http){

  const authCtrl = this;

  // ================================== //
  //          CREATE USER               //
  // ================================== //
  this.createUser = function () {
    console.log("Create user click works");
    $http({
      method: 'POST',
      url: '/users',
      data: {
        username: this.username,
        password: this.password
      }
    }).then(function(response){
      console.log(response);
    }, function () {
      console.log('error');
    })
}
  // ================================== //
  //           LOG IN USER              //
  // ================================== //
  this.logIn = function () {
    $http({
      method: 'POST',
      url: '/sessions',
      data: {
        username: this.usernameLogIn,
        password: this.passwordLogIn
      }
    }).then(function(response){
      console.log(response);

      authCtrl.getUserInfo()

    }, function(error){
      console.log(error);
      alert('Username or Password Not Found!')
    });
  }

  // ================================== //
  //           Retrive User Info        //
  // ================================== //

  this.getUserInfo = function (fund,cost) {
    $http({
      method:'GET',
      url:'/sessions'
    }).then(function (res) {
      console.log(res.data);

      // manipulate the funds first
      if(fund === "add"){
          res.data.budget += cost
          authCtrl.changeFunds(res.data.budget)
      }
      if(fund === "sub"){
          res.data.budget -= cost
          authCtrl.changeFunds(res.data.budget)
      }

      authCtrl.userInfo = res.data
    },function (err) {
      console.log(err);
    })
  }

  // ================================== //
  //           LOG OUT USER              //
  // ================================== //
  this.logOut = function () {
    $http({
      method:'DELETE',
      url:'/sessions'
    }).then(function (res) {
      console.log(res);
      authCtrl.userInfo = false
    },function (err) {
      console.log(err);
    })
  }

  // ================================== //
  //        Remove User Trip            //
  // ================================== //

  this.removeTrip = function (trip , id) {
    $http({
      method:'PUT',
      url:'/users/remove/' + id,
      data: trip
    }).then(function (res) {
      console.log(res.data);
      authCtrl.getUserInfo('add',trip.overallPrice)

    },function (err) {

    })
  }

  this.changeFunds = (amount) => {
    $http({
      method:'PUT',
      url: '/users/change/' + authCtrl.userInfo._id,
      data: {
        budget: amount
      }
    }).then(function(response){
      console.log('Success');

    }, function(error){
      console.log(error);
    })
  }



}]); // this closes the controller












//
