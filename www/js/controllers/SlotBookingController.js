var app = angular.module('starter');

app.controller('SlotBookingController', function($scope, $filter, $state, $http, $ionicHistory, $ionicModal, $httpParamSerializerJQLike){
   $scope.time = {
     start: 1,
     am: false,
     hours: 1
   };

   var path = "https://arupepark.herokuapp.com";
  //  var path = "http://localhost:8080";

   $scope.selectedSlot = {
     id : ''
   };

   $scope.selectedParking = $filter('findParking')($scope.parkings);
   //alert($scope.selectedParking);
   if($scope.selectedParking == null){
     $state.go('menu.home');
   }

   $scope.bookParking = function(){
     console.log($scope.selectedSlot.id);
     var start = $scope.time.am ? $scope.time.start : $scope.time.start + 12;
     var reqObj = {
       user_id : $scope.user._id,
       parking_id : $scope.selectedParking._id,
       slot_id : $scope.selectedSlot.id,
       start_time : start,
       hours : $scope.time.hours
     };
     $http.post( path + '/booking', $httpParamSerializerJQLike(reqObj),{
       headers:{
         'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
       }
     }).success(function(response){
       $scope.bookingDetails = response;
	   
	   $scope.formattedDate = $scope.changeDateFormat($scope.bookingDetails.date);
	   $scope.formattedTime = $scope.changeTimeFormat($scope.bookingDetails.start_time);
	   
       $scope.bookSuccessModal.show();
     }).error(function(response){

     });
   };

   $scope.changeDateFormat = function(currentDate){
       return currentDate.toString().substring(6, 8)  + "/" + (parseInt(currentDate.toString().substring(4, 6) , 10) + 1) + "/" + currentDate.toString().substring(0, 4);
   };
   
   $scope.changeTimeFormat = function(startTime){
       if(startTime > 12){
	      return (startTime - 12) + ":00 PM";
	   }
	   else if(startTime == 12){
	      return "12:00 PM"
	   }
	   else{
	      return startTime + ":00 AM"
	   }
   };
   
   $scope.gotoHome = function(){
     $scope.bookSuccessModal.hide();
     $ionicHistory.nextViewOptions({
       disableBack: true
     });
     $state.go('menu.home',{},{location: "replace"});
   };

   $scope.$watch('time', function(newTime, oldTime){
     var start_time = newTime.am ? newTime.start : newTime.start + 12;
     $http.get(path + '/location/' + $scope.selectedParking._id + '/' + start_time + '/' + newTime.hours)
      .success(function(response){
        $scope.selectedSlot.id = '';
        $scope.selectedParking = response;
      }).error(function(response){
        alert(JSON.stringify(response));
      });
   }, true);

   $ionicModal.fromTemplateUrl('templates/modal/bookingSuccessModal.html', {
     scope: $scope,
     animation: 'slide-in-up'
   }).then(function(modal){
     $scope.bookSuccessModal = modal;
   });
});


app.filter('findParking', function(){
  return function(input){
    for(var i=0;i<input.length;i++){
      if(input[i].isSelected == true){
        return input[i];
      }
    }
    return null;
  }
});
