var app = angular.module('starter');

app.controller('ProfileController', function($scope, UserService){
    alert("Hi");
	$scope.user = UserService.getUser();
});