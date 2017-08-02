var app = angular.module('starter');

app.controller('LoginController',function($scope, StorageService, UserService, $ionicPush, $state){
     $scope.loginDetails = {
	      phone : "",
		    pwd : ""
	   };

	 $scope.userLogin = function(){
	     UserService.doLogin($scope.loginDetails).then(function(response){
			  if(response.status === 200){
				$scope.user = response.data;
				$scope.user.isLoggedIn = true;
				StorageService.add($scope.user);
        $state.go('menu.home',null, {location: 'replace'});
			  }else{
				alert(response.data);
			  }
			},function(errResponse){
			  alert(JSON.stringify(errResponse));
			});
	 };
});
