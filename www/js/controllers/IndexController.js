var app = angular.module('starter');

app.controller('IndexController', function($scope, $state, $cordovaGeolocation, $http, $ionicModal){
  /*socket.io  start*/
    var socket = io.connect("https://arupepark.herokuapp.com");
    socket.on('test', function(data){
      //alert(JSON.stringify(data));
      //socket.emit('other event', {my : data});
      //alert($scope.markers[0]);
      var icon = {
        url : 'img/ionic-black.png',
        scaledSize : new google.maps.Size(50,50),
        origin : new google.maps.Point(0,0),
        anchor : new google.maps.Point(0,0)
      };
      $scope.markers[0].setIcon(icon);
    });
  /*socket.io  end*/

  $scope.search = {};
  $scope.markers = [];
  $scope.searchButtonText = "Search Location";
  $scope.currentLocation = {
    description : 'Fetching your location ...'
  };

  $ionicModal.fromTemplateUrl('templates/modal/placeSearchModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.modal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modal/parkingInfoModal.html', {
    scope: $scope,
    viewType: 'bottom-sheet',
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.parkingInfoModal = modal;
  });

  $scope.openParkingInfoModal = function(){
    $scope.parkingInfoModal.show();
  };

  $scope.openModal = function(){
    $scope.modal.show();
  };

  $scope.closeModal = function(){
    $scope.modal.hide();
  };

  $scope.getLocationList = function(){
    if($scope.search.text.length){
      service.getPlacePredictions({input: $scope.search.text}, function(predictions, status){
        if(status === google.maps.places.PlacesServiceStatus.OK){
          $scope.items = predictions;
          $scope.$apply();
        }
      });
    }else{
      $scope.items = [];
    }
  };

  $scope.selectLocation = function(index){
    $scope.currentLocation.description = $scope.items[index].description;
    $scope.modal.hide();
    $scope.placesService.getDetails({placeId: $scope.items[index].place_id}, function(place, status){
      if(status == google.maps.places.PlacesServiceStatus.OK){
        $scope.marker.setVisible(false);
        $scope.currentLocation.latlng = place.geometry.location;
        $scope.map.setCenter(place.geometry.location);
        $scope.map.setZoom(16);
        $scope.marker.setPosition(place.geometry.location);
        $scope.marker.setVisible(true);
      }
    });
  };

  $scope.getDistance = function(destination,index){
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [$scope.currentLocation.latlng],
        destinations: [destination],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      }, function(response, status){
        if(status === 'OK'){
          var km = response.rows[0].elements[0].distance.text;
          var duration = response.rows[0].elements[0].duration.text;
          $scope.parkings[index].distance = km;
          $scope.parkings[index].duration = duration;
          $scope.$apply();
        }
      }
    );
  };

  var service = new google.maps.places.AutocompleteService();

  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    //alert(JSON.stringify(position));
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    $scope.currentLocation.latlng = latlng;

    var mapOptions = {
      center : latlng,
      zoom : 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };
    var card = document.getElementById("parkSearch");

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    $scope.placesService = new google.maps.places.PlacesService($scope.map);
    $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);
    $scope.map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(document.getElementById("info"));

    var icon = {
      url : 'img/ionic.png',
      scaledSize : new google.maps.Size(80,80),
      origin : new google.maps.Point(0,0),
      anchor : new google.maps.Point(0,0)
    };

    var infoWindow = new google.maps.InfoWindow({
      content : "Here I am!"
    });

    $http.get('https://arupepark.herokuapp.com/location/').then(function(response){
      $scope.parkings = response.data;
      for(var i=0;i<$scope.parkings.length;i++){
        var loc = $scope.parkings[i];
        var latlng = new google.maps.LatLng(loc.lat, loc.lng);
        var marker = new google.maps.Marker({
          position: latlng,
          map: $scope.map,
          icon: icon
        });

        $scope.markers.push(marker);

        google.maps.event.addListener($scope.markers[i], 'click', (function(marker, i){
          return function(){
            infoWindow.setContent($scope.parkings[i].name);
            infoWindow.open($scope.map, $scope.markers[i]);
            $scope.selectedParking = $scope.parkings[i];
            $scope.getDistance(new google.maps.LatLng($scope.parkings[i].lat, $scope.parkings[i].lng), i);
            $scope.parkingInfoModal.show();
          }
        })($scope.markers[i], i));
      }
    }, function(error){
      alert("Cannot trace data from server");
    });

    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
      $scope.marker = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position: $scope.currentLocation.latlng
      });

      var geocoder = new google.maps.Geocoder;
      geocoder.geocode({'location': $scope.currentLocation.latlng}, function(results, status){
        if(status === 'OK'){
          if(results[1]){
            $scope.currentLocation.description = results[1].formatted_address;
			
			$scope.homeLocationDisplay = results[1].formatted_address;  //ADDITION
			
            $scope.$apply();
          }
        }
      });
    });

  }, function(error){
    console.log("Could not get location");
  });
});