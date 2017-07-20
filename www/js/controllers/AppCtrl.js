var app = angular.module('starter');

app.controller('AppCtrl',function($scope, $ionicModal, $http, $httpParamSerializerJQLike){

  $scope.reg = {
    name: 'Arup Sengupta',
    email: 'arupsenmail@gmail.com',
    phone: '9748216349',
    number: 'WB20AQ3524',
    pwd: 'asdfghjkl'
  };

  $scope.user = {};

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
    var url = "http://localhost:8080/users";
    $http.post(url, $httpParamSerializerJQLike($scope.reg), {
      headers:{
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(function(response){
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
    var url = "http://localhost:8080/users/login";
    $http.post(url,  $httpParamSerializerJQLike($scope.user), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(function(response){
      if(response.status === 200){
        $scope.user = response.data;
        $scope.loginModal.hide();
      }else{
        alert(response.data);
      }
    },function(errResponse){
      alert(JSON.stringify(errResponse));
    });
  };

});
