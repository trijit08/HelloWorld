var app = angular.module('starter');

app.controller('LoginController',function($scope, StorageService, UserService, $ionicPush, $state, $ionicLoading, $window){
     $scope.loginDetails = {
	      phone : "",
		    pwd : ""
	   };

	 $scope.userLogin = function(){
	         if($scope.loginDetails.phone.toString().length != 10 || $scope.loginDetails.phone == "" || $scope.loginDetails.phone == null){
			     swal(
					  'Oops...',
					  'Enter a valid mobile number',
					  'error'
					);
			 }else if($scope.loginDetails.pwd == "" || $scope.loginDetails.pwd == null){
                 swal(
					  'Oops...',
					  'Your password is incorrect',
					  'error'
					);			 
			 }else{
			     $ionicLoading.show({
				   template: 'Getting user details...'
				 });
					 UserService.doLogin($scope.loginDetails).then(function(response){
						  if(response.status === 200){
										$scope.user = response.data;
										$scope.user.isLoggedIn = true;
										StorageService.add($scope.user);
								  // register device for push notification
								  $ionicPush.register().then(function(t){
									return $ionicPush.saveToken(t);
								  }).then(function(t){
									UserService.saveToken(t.token).then(function(response){
									  console.log('Token saved: ', t.token);
									}, function(err){
									  console.log(err);
									});
								  });
								  $ionicLoading.hide();
								  $state.go('menu.home');
								  //$window.location.reload();
						  }else{
						          $ionicLoading.hide();
								  //alert(response.data);
								  swal(
								  'Sorry',
								  'Please try again',
								  'error'
							 );	
						  }
						},function(errResponse){
						    $ionicLoading.hide();
							//alert(JSON.stringify(errResponse));
							swal(
								  'Sorry',
								  'Your entered credentials is incorrect',
								  'error'
							 );	
						});
			 }		 
	  };
});
