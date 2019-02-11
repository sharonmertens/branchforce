const app = angular.module('TripApp', []);

// =================== //
//   TRIP CONTROLLER   //
// =================== //
app.controller('TripController', ['$http', function($http){
  const tripCtrl = this;
  this.includePath = "partials/home.html"

  this.changeInclude = function (path) {
    tripCtrl.includePath = 'partials/'+path+'.html'
  }

  // ====================================== //
  //   USER SEARCHES FOR TRIP/FLIGHT DATA   //
  // ====================================== //
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

  // ========================= //
  //   USER STORES TRIP DATA   //
  // ========================= //
  this.bookmarkedTrip = []

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
    // console.log(tripCtrl.bookmarkedTrip);
  }

}])

// ============================ //
//   AUTHORIZATION CONTROLLER   //
// ============================ //
app.controller('AuthController', ['$http', function($http){

  const authCtrl = this;

  // =============== //
  //   CREATE USER   //
  // =============== //
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
  // =============== //
  //   LOG IN USER   //
  // =============== //
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
    });
  }

  // ====================== //
  //   RETRIEVE USER INFO   //
  // ====================== //

  this.getUserInfo = function () {
    $http({
      method:'GET',
      url:'/sessions'
    }).then(function (res) {
      authCtrl.userInfo = res.data
    },function (err) {
      console.log(err);
    })
  }

  // ================ //
  //   LOG OUT USER   //
  // ================ //
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

}]); // this closes the controller
