var app = angular.module('starter');

app.controller('AppCtrl',function($scope, $ionicModal, $http, $httpParamSerializerJQLike,
    StorageService, UserService, parkings, LocationService, $ionicPush, $state){

  $ionicPush.register().then(function(t){
    return $ionicPush.saveToken(t);
  }).then(function(t){
    console.log('Token saved: ', t.token);

  });

  $scope.$on('cloud:push:notification', function(event, data){
    var msg = data.message;
    console.log(msg.title + ': ' + msg.text);
  });

  $scope.reg = {
    name: 'Arup Sengupta',
    email: 'arupsenmail@gmail.com',
    phone: '9748216349',
    number: 'WB20AQ3524',
    pwd: 'asdfghjkl'
  };

  // alert(JSON.stringify(parkings));

  $scope.parkings = parkings.data;

  $scope.user = UserService.getUser();
  //alert($scope.user.length);
  //alert(JSON.stringify($scope.user));
  
  /******************************************* USER LOGIN CHECK START ************************************/
  if($scope.user.name != "" && $scope.user.password != "" && $scope.user.phone != "" && $scope.user.vehicle_no != ""){
      $state.go('menu.home');
  }else{
      $state.go('menu.login');
  }
  /******************************************* USER LOGIN CHECK END ************************************/

  $ionicModal.fromTemplateUrl('/templates/modal/loginModal.html',{
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
  };

  $scope.register = function(){
    UserService.doRegister($scope.reg).then(function(response){
      if(response.status === 200){
        $scope.user = response.data;
        $scope.loginModal.hide();
      }else{
        alert('Could not add user');
      }
    },function(errResponse){
      alert(JSON.stringify(errResponse));
    });
  };

  $scope.login = function(){
    UserService.doLogin().then(function(response){
      if(response.status === 200){
        $scope.user = response.data;
        $scope.user.isLoggedIn = true;
        StorageService.add($scope.user);
        $scope.loginModal.hide();
      }else{
        alert(response.data);
      }
    },function(errResponse){
      alert(JSON.stringify(errResponse));
    });
  };

});
