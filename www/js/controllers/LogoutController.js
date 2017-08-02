var app = angular.module('starter');

app.controller('LogoutController',function($scope, StorageService, UserService, $state){
	$scope.user = {};
	UserService.setUser($scope.user);
	StorageService.add($scope.user);

        $state.go('login',null, {location: 'replace'});
});
