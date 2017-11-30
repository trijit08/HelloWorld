var app = angular.module('starter');

app.controller('ProfileController', function($scope, UserService, $ionicLoading, $ionicModal){
    //alert("Hi");
	//$scope.user = UserService.getUser();
		var socket = io.connect("http://www.eparkindia.com");
    socket.on('qr-book', function(data){
      if(data.user_id == $scope.reguser._id){
				$scope.bookSuccess = data.obj;
				$scope.bookSuccess.name = data.name;
				if($scope.bookSuccess.active){
						$scope.bookSuccessModal.show();
				}else{
						$scope.billModal.show();
				}
			}

      $scope.$apply();
    });
   /* socket.io end */

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

	$ionicModal.fromTemplateUrl('templates/modal/bookingSuccessModal.html', {
		scope: $scope,
		viewType: 'bottom-sheet',
		animation: 'slide-in-up'
	}).then(function(modal){
		$scope.bookSuccessModal = modal;
	});

	$ionicModal.fromTemplateUrl('templates/modal/billModal.html', {
		scope: $scope,
		viewType: 'bottom-sheet',
		animation: 'slide-in-up'
	}).then(function(modal){
		$scope.billModal = modal;
	});

	$scope.closeModal = function(){
		$scope.bookSuccessModal.hide();
	};

	$scope.closeBillModal = function(){
		$scope.billModal.hide();
	};

});
