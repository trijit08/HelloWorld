var app = angular.module('starter');

app.factory('StorageService', function($localStorage){
  $localStorage = $localStorage.$default({
    user: {}
  });

  var _get = function(){
    return $localStorage.user;
  };

  var _add = function(user){
    $localStorage.user = user;
  };

  return{
    get : _get,
    add: _add
  };
});
