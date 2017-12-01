var app = angular.module('starter');

app.controller('AppCtrl',function($scope, $ionicModal, $http,  $cordovaNetwork, $cordovaDevice, $httpParamSerializerJQLike,StorageService, UserService, parkings, LocationService, $ionicPush, $state, $ionicPopup){
		  $scope.user = UserService.getUser();

		  $scope.showAlert = function(heading, token){
			var alert = $ionicPopup.alert({
			  title: heading,
			  template: token
			});
		  };

		  $scope.$on('cloud:push:notification', function(event, data){
			var msg = data.message;
			$scope.showAlert(msg.title, msg.text);
		  });

		  $scope.reg = {};

		  $scope.parkings = parkings.data;
		  $scope.parking = LocationService.getParking();

		  //************************************** INTERNET AND GPS CHECKING START ****************************************
		  /*
		  var isOnline = $cordovaNetwork.isOnline()
		  if(isOnline){
				  if (window.cordova) {
							window.cordova.plugins.diagnostic.isLocationEnabled(function (locationEnabled) {
							if (locationEnabled) {
								locationEnabled();
							} else {
								locationDisabled();
							}
						}, function (error) {
							 console.log("The following error occurred: " + error);
						});
				   }
				  
				   function locationEnabled() {
					  console.log("GPS Enabled"); 
				   };

				   function locationDisabled() {
						 swal({
						  title: 'GPS is not enabled',
						  text: "Without GPS ePark cannot locate you and hence has to exit. Switch on GPS and try again.",
						  type: 'warning',
						  timer : 5000
						 });
					 
					 setTimeout(function(){
						  ionic.Platform.exitApp();
						}, 5000);
				   };
		  }else{
		        swal({
				  title: 'No Internet Connection',
				  text: "Sorry! Without internet ePark has to exit.",
				  type: 'warning',
				  timer : 5000
			    });
		      
		        setTimeout(function(){
		            ionic.Platform.exitApp();
		        }, 5000);
		  }
		  */
		  //************************************** INTERNET AND GPS CHECKING END ****************************************
		  
		  $scope.currentLocation = {
			latlng : new google.maps.LatLng(22.5726, 88.3639)
		  };

          
});
