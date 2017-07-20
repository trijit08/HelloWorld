var app = angular.module('starter');

app.controller('AppCtrl',function($scope, $ionicModal, $http, $httpParamSerializerJQLike, StorageService, UserService){

  $scope.reg = {
    name: 'Arup Sengupta',
    email: 'arupsenmail@gmail.com',
    phone: '9748216349',
    number: 'WB20AQ3524',
    pwd: 'asdfghjkl'
  };

  $scope.user = UserService.getUser();

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
