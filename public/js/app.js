const app = angular.module('TripApp', []);

// ========================= //
//      TRIP CONTROLLER      //
// ========================= //
app.controller('TripController', ['$http', function($http){
  this.foo = "bar"
}])

// ================================== //
//      AUTHORIZATION CONTROLLER      //
// ================================== //
app.controller('AuthController', ['$http', function($http){

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
  };

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
    }, function(error){
      console.log(error);
    });
  }

}]); // this closes the controller
