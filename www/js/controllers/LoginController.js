var app = angular.module('starter');

app.controller('LoginController',function($scope, StorageService, UserService, $ionicPush, $state){
     $scope.loginDetails = {
	     mobileNumber : "",
		 password : ""
	 };
	 
	 $scope.userLogin = function(){
	     UserService.doLogin().then(function(response){
			  if(response.status === 200){
				$scope.user = response.data;
				$scope.user.isLoggedIn = true;
				StorageService.add($scope.user);
			  }else{
				alert(response.data);
			  }
			},function(errResponse){
			  alert(JSON.stringify(errResponse));
			});
	 };
});
