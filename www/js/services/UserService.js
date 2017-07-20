var app = angular.module('starter');

app.factory('UserService', function($http,$httpParamSerializerJQLike){

  var user = {};

  var getUser = function(){
    return user;
  };

  var setUser = function(arg){
    user = arg;
  };

  var doRegister = function(regUser){
    var url = "http://localhost:8080/users";
    return $http.post(url, $httpParamSerializerJQLike(regUser), {
      headers:{
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).success(function(response){
      return response;
    }).error(function(err){
      return err;
    });
  };

  var doLogin = function(){
    var url = "http://localhost:8080/users/login";
    return $http.post(url,  $httpParamSerializerJQLike(user), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).success(function(response){
      return response;
    }).error(function(errResponse){
      return errResponse;
    });
  };

  var factory = {
    doRegister: doRegister,
    getUser: getUser,
    setUser: setUser,
    doLogin: doLogin
  };

  return factory;
});
