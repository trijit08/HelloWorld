var app = angular.module('starter');

app.controller('LoginController',function($scope, StorageService, UserService, $ionicPush, $state, $ionicLoading, $window){
     $scope.loginDetails = {
	      phone : "",
		    pwd : ""
	   };

	 $scope.userLogin = function(){
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
          $window.location.reload();
			  }else{
				      //alert(response.data);
			  }
			},function(errResponse){
			    //alert(JSON.stringify(errResponse));
			});
	 };
});
