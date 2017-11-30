var app = angular.module('starter');

app.controller('BookingHistoryController', function($scope, UserService, $http, $window, $ionicLoading){
		$ionicLoading.show({
			template: 'Getting your booking history'
		});
		  $scope.bookingHistory = UserService.getBookingHistory();
		  $scope.user = UserService.getUser();
		  var url = UserService.getUrl();

		  $http.get(url+ '/booking/user/' + $scope.user._id).success(function(response){
			$scope.bookingHistory = response;
			for(var i=0; i<$scope.bookingHistory.length; i++){
				$scope.bookingHistory[i].duration = bookingHistory[i].mins/60 + ":" + bookingHistory[i].mins%60 + " hour(s)";
			  $scope.bookingHistory[i].formatDate = $scope.formatDate($scope.bookingHistory[i].date.toString());
			}
			$ionicLoading.hide();
		  });



		  // console.log($scope.bookingHistory);

		  $scope.formatDate = function(dat) {
			var monthNames = [
			  "January", "February", "March",
			  "April", "May", "June", "July",
			  "August", "September", "October",
			  "November", "December"
			];

			var year = parseInt(dat.substr(0,4));
			var monthIndex = parseInt(dat.substr(4,2));
			var day = parseInt(dat.substr(6,2));

			return day + ' ' + monthNames[monthIndex] + ' ' + year;
		  };


		  $scope.cancelBooking = function(bookingID){
		      $http({
					method : 'PUT',
					url : 'https://arupepark.herokuapp.com/booking/' + bookingID,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
				}). then(function successCallback(response){
					 //alert("Updated successfully");
					 swal({
						  title: 'Booking Cancelled!',
						  text: "This booking won't bother you again.",
						  type: 'success',
						  timer : 8000
					 });
					 $window.location.reload();
				 }, function errorCallback(response){
					 //alert("Failed");
					 //alert(JSON.stringify(response));
					 sweetAlert("Oops...", "This booking couldn't be cancelled", "error");
				});
		  };

			$scope.doRefresh = function(){
				$ionicLoading.show({
					template: 'Getting your booking history'
				});
				$http.get(url+ '/booking/user/' + $scope.user._id).success(function(response){
				$scope.bookingHistory = response;
				for(var i=0; i<$scope.bookingHistory.length; i++){
				  $scope.bookingHistory[i].formatDate = $scope.formatDate($scope.bookingHistory[i].date.toString());
				}
				$ionicLoading.hide();
			  })
				.finally(function() {
		       // Stop the ion-refresher from spinning
		       $scope.$broadcast('scroll.refreshComplete');
		     });
			};
});
