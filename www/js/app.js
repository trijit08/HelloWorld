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
      auth: function(StorageService, UserService, $q){
        var d = $q.defer();
        var user = StorageService.get();
        //alert(JSON.stringify(user));
        if(!angular.equals(user, {})){
            UserService.setUser(user);
            d.resolve();
        }else {
          d.reject('not logged in');
        }
        return d.promise;
      },
      parkings : function(LocationService){
        return LocationService.getParkingArr().then(function(response){
          console.log(response);
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
        controller: 'IndexController',
      }
    }
  })
  .state('login',{
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginController'
  })
  .state('register',{
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterController'
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
  })
  .state('menu.logout',{
    url: '/logout',
    views: {
      'menuContent': {
      	templateUrl : 'templates/logout.html',
	controller : 'LogoutController'
      }
    }
  });


  $urlRouterProvider.otherwise("/menu/home");
})

.run(function($ionicPlatform, $rootScope, $state) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
    $state.go('login');
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
