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
					$state.go('menu.home');
				  }else{
					alert('Could not add user');
				  }
			},function(errResponse){
			  alert(JSON.stringify(errResponse));
		 });
	 };
});
