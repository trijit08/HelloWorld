var app = angular.module('starter');

app.controller('ProfileController', function($scope, UserService){
    //alert("Hi");
	//$scope.user = UserService.getUser();
	$scope.user = UserService.getUser();
	// console.log($scope.reguser);
	// $scope.$apply();
	$scope.updateProfile() = function(){
		UserService.updateProfile().success(function(response){
			$scope.user = response;
		});
	};
});
