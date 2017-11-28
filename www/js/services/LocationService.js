var app = angular.module('starter');

app.factory('LocationService', function($http){

  //var path = "https://arupepark.herokuapp.com";
  var path = "http://www.eparkindia.com";
  
  var time = {
    start: 0,
    am: true,
    hours: 1
  };

  var parkingArr = [];
  var parkingId = '';
  var parking = {};

  var getParkingId = function(){
    return parkingId;
  };

  var getTime = function(){
    return time;
  };

  var setParkingId = function(arg){
    parkingId = arg;
  };

  var getParking = function(){
    return parking;
  };

  var setParking = function(obj){
    parking = obj;
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
    setParkingId : setParkingId,
    getParking : getParking,
    setParking : setParking,
    getTime : getTime
  };

  return factory;
});
