angular.module('starter', ['ionic', 'ionic.cloud', 'ngCordova', 'ngStorage'])

.config(function($stateProvider, $urlRouterProvider, $ionicCloudProvider){
  $ionicCloudProvider.init({
    "core": {
      "app_id": "dd192103"
    },
    "push": {
      "sender_id": "1098016573394",
      "pluginConfig": {
        "android": {
          "iconColor": "#343434"
        }
      }
    }
  });

  $stateProvider
  .state('menu',{
    url: '/menu',
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl',
    resolve: {
      auth: function(StorageService, UserService){
        UserService.setUser(StorageService.get());
      },
      parkings : function(LocationService){
        return LocationService.getParkingArr().then(function(response){
          return response;
        }, function(error){
          return null;
        })
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
  })
  .state('menu.login',{
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
      }
    }
  })
  .state('menu.register',{
    url: '/register',
    views: {
      'menuContent': {
        templateUrl: 'templates/register.html',
        controller: 'RegisterController'
      }
    }
  })
  .state('menu.bookingHistory',{
    url: '/bookingHistory',
    views: {
      'menuContent': {
        templateUrl: 'templates/bookingHistory.html',
        controller: 'BookingHistoryController'
      }
    }
  })
  .state('menu.slotBooking',{
    url: '/slotBooking',
    views: {
      'menuContent': {
        templateUrl: 'templates/slotBook.html',
        controller: 'SlotBookingController'
      }
    }
  })
  .state('menu.contacts',{
    url: '/contacts',
    views: {
      'menuContent': {
        templateUrl: 'templates/contacts.html'
      }
    }
  })
  .state('menu.chat',{
    url: '/chat',
    views: {
      'menuContent': {
        templateUrl: 'templates/chat.html',
		controller: 'ChatController'
      }
    }
  })
  .state('menu.feedback',{
    url: '/feedback',
    views: {
      'menuContent': {
        templateUrl: 'templates/feedback.html',
		controller: 'FeedbackController'
      }
    }
  })
  .state('menu.profile',{
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileController'
      }
    }
  });

  $urlRouterProvider.otherwise("/menu/home");
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
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
