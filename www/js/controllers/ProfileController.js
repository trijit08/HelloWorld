var app = angular.module('starter');

app.controller('ProfileController', function($scope, UserService, $ionicLoading){
    //alert("Hi");
	//$scope.user = UserService.getUser();
	$scope.reguser = UserService.getUser();
	console.log($scope.reguser);
	// console.log($scope.reguser);
	// $scope.$apply();
	$scope.string = 'Arup Sengupta';

	$scope.updateProfile= function(){
		$ionicLoading.show({
			template: 'Updating user details...'
		})
		UserService.updateProfile($scope.reguser).success(function(response){
			$scope.user = response;
			$ionicLoading.hide();
			swal({
				 title: 'User Details Updated!',
				 text: "Details updated successfully.",
				 type: 'success',
				 timer : 8000
			});
		});
	};

});
