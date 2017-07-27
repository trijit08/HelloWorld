var app = angular.module('starter');

app.controller('ProfileController', function($scope, $http, $ionicPlatform, $ionicLoading, $httpParamSerializerJQLike){
    $scope.accountPresent = false;
	
	$scope.checkProfile = function(){
	    /*
		$scope.result = [];
	
		$http({
			  method: 'GET',
			  url: 'https://arupepark.herokuapp.com/users'
			}).then(function successCallback(response){
				 for(var i=0;i<response.data.length;i++){
					 $scope.result.push(response.data[i]);
				 }
				 $ionicLoading.hide();
			 }, function errorCallback(response){
				 alert(JSON.stringify(response));
				 $ionicLoading.hide();
			});
		  */
		  $ionicLoading.hide();     //REMOVE THIS LINE ONCE THE SERVICE CALL IS DONE
	};
	
	$ionicPlatform.ready(function() {
         $ionicLoading.show({
			content: 'Loading',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 0
		}); 
        $scope.checkProfile();		
    });
});