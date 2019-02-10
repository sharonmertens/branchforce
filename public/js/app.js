const app = angular.module('TripApp', []);

// ========================= //
//      TRIP CONTROLLER      //
// ========================= //
app.controller('TripController', ['$http', function($http){
  const tripCtrl = this;
  this.includePath = ""

  this.changeInclude = function (path) {
    tripCtrl.includePath = './partials/'+path+'.html'
  }
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

      authCtrl.getUserInfo()

    }, function(error){
      console.log(error);
    });
  }

  // ================================== //
  //           Retrive User Info        //
  // ================================== //

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

}]); // this closes the controller












//
