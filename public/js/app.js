const app = angular.module('TripApp', []);

app.controller('TripController', ['$http', function($http){
  this.foo = "bar"

  // function to create user
  this.createUser = function () {
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

  // function to log in
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
