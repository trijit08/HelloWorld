var app = angular.module('starter');

app.controller('FeedbackController', function($scope, $http, $state, UserService){
    $scope.feedback = {
	    bookingId : "",
		userText : ""
	};
	
	$scope.user = UserService.getUser();
	
	$scope.submitFeedback = function(){
	    $http({
			  method: 'POST',
			  url: 'https://arupepark.herokuapp.com/feedback/' + $scope.user._id,
			  headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
			  data: $.param({
							  "bookingID": $scope.feedback.bookingId,
							  "userText": $scope.feedback.userText,
				       })
			}).then(function successCallback(response){
				//alert("Feedback successfully submitted");
				swal("Thanks a lot!", "Your feedback has been submitted succesfully!", "success")
				$state.go('menu.home');
			}, function errorCallback(response){
				//alert("Oops! This Location could not be created");
				sweetAlert("Oops...", "The feedback couldn't be recorded. Please try again.", "error");
			});
	};
});