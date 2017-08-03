var app = angular.module('starter');

app.controller('RegisterController',function($scope, StorageService, UserService, $ionicPush, $state){
     $scope.userReg = {
	        name: '',
			email: '',
			phone: '',
			number: '',
			pwd: ''
	 };

	 $scope.userRegister = function(){
	     UserService.doRegister($scope.userReg)
		    .then(function(response){
				  if(response.status === 200){
  					$scope.user = response.data;
  					StorageService.add($scope.user);
            $ionicPush.register().then(function(t){
              return $ionicPush.saveToken(t);
            }).then(function(t){
              UserService.saveToken(t.token).then(function(response){
                console.log('Token saved: ', t.token);
              }, function(err){
                console.log(err);
              });
            });
  					$state.go('menu.home',null, {location: 'replace'});
				  }
			  },function(errResponse){
			  //alert(JSON.stringify(errResponse));
		 });
	 };
});
