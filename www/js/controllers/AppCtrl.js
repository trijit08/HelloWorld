var app = angular.module('starter');

app.controller('AppCtrl',function($scope, $ionicModal, $http, $httpParamSerializerJQLike,StorageService, UserService, parkings, LocationService, $ionicPush, $state, $ionicPopup){
  $scope.user = UserService.getUser();



  $scope.showAlert = function(heading, token){
    var alert = $ionicPopup.alert({
      title: heading,
      template: token
    });
  };

  $scope.$on('cloud:push:notification', function(event, data){
    var msg = data.message;
    $scope.showAlert(msg.title, msg.text);
  });

  $scope.reg = {};

  $scope.parkings = parkings.data;
  $scope.parking = LocationService.getParking();

  $scope.currentLocation = {
    latlng : new google.maps.LatLng(22.5726, 88.3639)
  };


  /******************************************* USER LOGIN CHECK START ************************************/
  // if($scope.user.name != "" && $scope.user.password != "" && $scope.user.phone != "" && $scope.user.vehicle_no != ""){
  //     $state.go('menu.home');
  // }else{
  //     $state.go('login');
  // }
  /******************************************* USER LOGIN CHECK END ************************************/

  /*$ionicModal.fromTemplateUrl('/templates/modal/loginModal.html',{
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.loginModal = modal;
  });

  $scope.closeLogin = function(){
    $scope.loginModal.hide();
  };

  $scope.openLogin = function(){
    $scope.loginModal.show();
  };*/

  // $scope.register = function(){
  //   UserService.doRegister($scope.reg).then(function(response){
  //     if(response.status === 200){
  //       $scope.user = response.data;
  //       $scope.loginModal.hide();
  //     }else{
  //       $scope.showAlert('Error', 'Could not add user');
  //     }
  //   },function(errResponse){
  //     $scope.showAlert('Error', 'Could not add user');
  //   });
  // };
  //
  // $scope.login = function(){
  //   UserService.doLogin().then(function(response){
  //     if(response.status === 200){
  //       $scope.user = response.data;
  //       $scope.user.isLoggedIn = true;
  //       StorageService.add($scope.user);
  //       $scope.loginModal.hide();
  //
  //       // register device for push notification
  //       $ionicPush.register().then(function(t){
  //         return $ionicPush.saveToken(t);
  //       }).then(function(t){
  //         UserService.saveToken(t.token).then(function(response){
  //           console.log('Token saved: ', t.token);
  //         }, function(err){
  //           console.log(err);
  //         });
  //       });
  //     }else{
  //       console.log(response.data);
  //       $scope.showAlert('Error', 'Login Failed');
  //     }
  //   },function(errResponse){
  //     console.log(errResponse);
  //   });
  // };

});
