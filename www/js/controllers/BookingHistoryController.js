var app = angular.module('starter');

app.controller('BookingHistoryController', function($scope, UserService, $http){
  $scope.bookingHistory = UserService.getBookingHistory();
  $scope.user = UserService.getUser();
  var url = UserService.getUrl();

  $http.get(url+ '/booking/user/' + $scope.user._id).success(function(response){
    $scope.bookingHistory = response;
    for(var i=0; i<$scope.bookingHistory.length; i++){
      $scope.bookingHistory[i].formatDate = $scope.formatDate($scope.bookingHistory[i].date.toString());
    }
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

});
