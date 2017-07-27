var app = angular.module('starter');

app.factory('LocationService', function($http){

  // var path = "http://localhost:8080";
  var path = "https://arupepark.herokuapp.com";

  var parkingArr = [];
  var parkingId = '';

  var getParkingId = function(){
    return parkingId;
  };

  var setParkingId = function(arg){
    parkingId = arg;
  };

  var getParkingArr = function(){
    return $http.get(path + '/location')
      .success(function(response){
        parkingArr = response;
        return parkingArr;
      })
      .error(function(error){
        return error;
      });
  };

  var factory = {
    getParkingArr : getParkingArr,
    getParkingId : getParkingId,
    setParkingId : setParkingId
  };

  return factory;
});
