var app = angular.module('starter');

app.factory('UserService', function($http,$httpParamSerializerJQLike){
  //var url = "http://localhost:8080";
  var url = "https://arupepark.herokuapp.com";

  var user = {};

  var getUrl = function(){
    return url;
  };

  var getUser = function(){
    return user;
  };

  var setUser = function(arg){
    user = arg;
  };

  var bookingHistory = [];

  var getBookingHistory = function(){
      return bookingHistory;
  };

  var doRegister = function(regUser){
    return $http.post(url + '/users', $httpParamSerializerJQLike(regUser), {
      headers:{
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).success(function(response){
      return response;
    }).error(function(err){
      return err;
    });
  };

  var doLogin = function(obj){
    //var url = "http://localhost:8080/users/login";
    return $http.post(url + '/users/login',  $httpParamSerializerJQLike(obj), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).success(function(response){
      user = response;
      return response;
    }).error(function(errResponse){
      return errResponse;
    });
  };

  var updateProfile = function(){
    return $http.put(url + '/users/' + user._id, $httpParamSerializerJQLike(user), {
      headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).success(function(response){
      user = response;
      return response;
    });
  };

  var saveToken = function(token){
    var tokenObj = {
      value : token
    };
    return $http.get(url + '/users/token/' + user._id + '/' + token)
      .success(function(response){
        return response;
      }).error(function(errResponse){
        return errResponse;
      });
  };

  var factory = {
    doRegister: doRegister,
    getUser: getUser,
    setUser: setUser,
    doLogin: doLogin,
    saveToken: saveToken,
    getBookingHistory : getBookingHistory,
    getUrl : getUrl,
    updateProfile : updateProfile
  };

  return factory;
});
