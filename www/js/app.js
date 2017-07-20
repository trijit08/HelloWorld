// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'ngStorage'])

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('menu',{
    url: '/menu',
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl',
    resolve: {
      auth: function(StorageService, UserService){
        UserService.setUser(StorageService.get());
      }
    }
  })
  .state('menu.home',{
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/map.html',
        controller: 'IndexController'
      }
    }
  });

  $urlRouterProvider.otherwise("/menu/home");
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.directive('ionBottomSheet', [function() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      controller: [function() {}],
      template: '<div class="modal-wrapper" ng-transclude></div>'
    };
  }])
.directive('ionBottomSheetView', function() {
  return {
    restrict: 'E',
    compile: function(element) {
      element.addClass('bottom-sheet modal');
    }
  };
})
