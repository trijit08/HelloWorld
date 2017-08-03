var app = angular.module('starter');

app.controller('SlotBookingController', function($scope, $window, $filter, $state, $http, $ionicHistory, $ionicModal, $httpParamSerializerJQLike, LocationService){
   
   $scope.newUser = {
      choice : "",
      vehicleReg : ""
   };
   
  //  socket.on('booked', fucntion(data){
	//     console.log(data);
  //  });

   var path = "https://arupepark.herokuapp.com";
  //  var path = "http://localhost:8080";

   var socket = io.connect(path);
   socket.on('test', function(data){
     //alert(JSON.stringify(data));
     socket.emit('other event', {my : data});
     //alert($scope.markers[0]);
     // var icon = {
     //   url : 'img/ionic-black.png',
     //   scaledSize : new google.maps.Size(50,50),
     //   origin : new google.maps.Point(0,0),
     //   anchor : new google.maps.Point(0,0)
     // };
     // $scope.markers[0].setIcon(icon);
   });

   socket.on('booked', function(data){
     if(data.parking_id == $scope.parking._id){
       if(($scope.time.start >= data.start_time && $scope.time.start < data.start_time + data.hours)
           || ($scope.time.start < data.start_time && ($scope.time.start + $scope.time.hours) > data.start_time)){
             for(var i=0; i<$scope.parking.parking_arr.length; i++){
               if($scope.parking.parking_arr[i]._id == data.slot_id){
                 $scope.parking.parking_arr[i].status = 'booked';
                 $scope.$apply();
                 break;
               }
             }
       }
     }
   });

   socket.on('pending', function(data){
     if(data.parking_id == $scope.parking._id){
       if(($scope.time.start >= data.start_time && $scope.time.start < data.start_time + data.hours)
           || ($scope.time.start < data.start_time && ($scope.time.start + $scope.time.hours) > data.start_time)){
             for(var i=0; i<$scope.parking.parking_arr.length; i++){
               if($scope.parking.parking_arr[i]._id == data.slot_id){
                 $scope.parking.parking_arr[i].status = 'pending';
                 $scope.$apply();
                 break;
               }
             }
       }
     }
   });

   socket.on('inprocess', function(data){
     console.log('inprocess');
     if(data.parking_id == $scope.parking._id){
       if(($scope.time.start >= data.start_time && $scope.time.start < data.start_time + data.hours)
           || ($scope.time.start < data.start_time && ($scope.time.start + $scope.time.hours) > data.start_time)){
             for(var i=0; i<$scope.parking.parking_arr.length; i++){
               if($scope.parking.parking_arr[i]._id == data.slot_id){
                 if($scope.parking.parking_arr[i].status == 'available'){
                   $scope.parking.parking_arr[i].status = 'inprocess';
                 }
                 $scope.$apply();
                 break;
               }
             }
       }
     }
   });

   socket.on('vacant', function(data){
     if(data.parking_id == $scope.parking._id){
       if(($scope.time.start >= data.start_time && $scope.time.start < data.start_time + data.hours)
           || ($scope.time.start < data.start_time && ($scope.time.start + $scope.time.hours) > data.start_time)){
             for(var i=0; i<$scope.parking.parking_arr.length; i++){
               if($scope.parking.parking_arr[i]._id == data.slot_id){
                 $scope.parking.parking_arr[i].status = 'available';
                 $scope.$apply();
                 break;
               }
             }
       }
     }
   });

   $scope.selectedSlot = {
     id : ''
   };

   $scope.parking = LocationService.getParking();
   $scope.time = LocationService.getTime();

  //  $scope.parking = $filter('findParking')($scope.parkings);
   //alert($scope.parking);
   if($scope.parking == null){
     $state.go('menu.home', null, {reload: true});
   }

   console.log($scope.parking);

   var date = new Date();
   var hours = date.getHours();

   //var start_time = $scope.parking.opening_hours.start > hours ? $scope.parking.opening_hours.start : hours;
   var start_time = hours;


   $scope.time.start = start_time;
   $scope.time.am = start_time <= 12 ? true : false;
   $scope.time.hours= 1

   $scope.dcrStartTime = function(){
     $scope.time.start = $scope.time.start == start_time ? start_time : $scope.time.start - 1;
     $scope.time.am = $scope.time.start <= 12 ? true: false;
   };

   $scope.incStartTime = function(){
     $scope.time.start = (($scope.time.start+$scope.time.hours) == $scope.parking.opening_hours.end) ? $scope.time.start : $scope.time.start + 1;
     $scope.time.am = $scope.time.start <= 12 ? true: false;
   };

   $scope.incHours = function(){
     $scope.time.hours = (($scope.time.start+$scope.time.hours) == $scope.parking.opening_hours.end) ? $scope.time.hours : $scope.time.hours + 1;
   };

   $scope.getIndex = function(slotid){
       for(var i=0; i <= $scope.parking.number_of_slot; i++){
         if($scope.parking.parking_arr[i]._id == slotid){
           return i;
         }
       }
       return 0;
   };

   $scope.bookParking = function(){
     console.log($scope.selectedSlot.id);
	
     if($scope.selectedSlot.id !== ''){
       var start = $scope.time.start;

	   if($scope.newUser.choice == 'S'){
		   var reqObj = {
			 user_id : $scope.user._id,
			 parking_id : $scope.parking._id,
			 slot_id : $scope.selectedSlot.id,
			 start_time : start,
			 hours : $scope.time.hours,
			 reg_number : $scope.user.vehicle_no
		   };
       }
	   else{
	       var reqObj = {
			 user_id : $scope.user._id,
			 parking_id : $scope.parking._id,
			 slot_id : $scope.selectedSlot.id,
			 start_time : start,
			 hours : $scope.time.hours,
			 reg_number : $scope.newUser.vehicleReg
		   };
	   };
	   
	   $http.post( path + '/booking', $httpParamSerializerJQLike(reqObj),{
         headers:{
           'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
         }
       }).success(function(response){
          $scope.bookingDetails = response;
          $scope.bookingDetails.slot = $scope.getIndex($scope.bookingDetails.slot_id);
  	      $scope.formattedDate = $scope.changeDateFormat($scope.bookingDetails.date);
  	      $scope.formattedTime = $scope.changeTimeFormat($scope.bookingDetails.start_time);

          $scope.bookSuccessModal.show();

          var start = $scope.time.start <= 12 ? $scope.time.start : $scope.time.start - 12;
          var ampm = $scope.time.start <= 12 ? 'am' : 'pm';
          var index = $scope.bookingDetails.slot;
          var payload = {
            parking_id: $scope.parking._id,
            reg_number: $scope.user.vehicle_no,
            start: start,
            ampm: ampm,
            hours: $scope.time.hours,
            index: index
          };

		  
		  if($scope.user.vehicle_no != $scope.bookingDetails.manualData.reg_number){
		      $scope.showOtherBookingFlag = true;
			  $scope.otherVehicleReg = $scope.bookingDetails.manualData.reg_number;
		  }else{
              $scope.showOtherBookingFlag = false;		  
		  }
		  
          $http.get(path + '/operator/notify', $httpParamSerializerJQLike(payload)).success(function(res){

          }).error(function(err){
            console.log("Cannot notify operator");
          });
       }).error(function(response){

       });
     }
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
    //  $ionicHistory.nextViewOptions({
    //    disableBack: true
    //  });
     //$state.go('menu.home',null, {reload: true});
	   $state.go('menu.home');
	   $window.location.reload();
   };

   $scope.$watch('time', function(newTime, oldTime){
     var start_time = newTime.start;
     $http.get(path + '/location/' + $scope.parking._id + '/' + start_time + '/' + newTime.hours)
      .success(function(response){
        $scope.selectedSlot.id = '';
        $scope.parking = response;
      }).error(function(response){
        //alert(JSON.stringify(response));
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
