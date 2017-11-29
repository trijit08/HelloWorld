var app = angular.module('starter');

app.controller('RegisterController',function($scope, StorageService, UserService, $ionicPush, $state){
     $scope.userReg = {
	        name: '',
			email: '',
			phone: '',
			number: '',
			pwd: '',
			type : ''
	 };

	 $scope.goBack = function(){
	     window.history.back();
	 };
	 
	 var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
	 
	 $scope.userRegister = function(){
	    if($scope.userReg.name == "" || $scope.userReg.name == null || !isNaN($scope.userReg.name) /*|| format.test($scope.userReg.name)*/){
		      swal(
					  'Oops...',
					  'Enter your valid name',
					  'error'
					);
		}else if($scope.userReg.phone == "" || $scope.userReg.phone == null || $scope.userReg.phone.toString().length != 10){
		    swal(
					  'Oops...',
					  'Enter your valid mobile number',
					  'error'
					); 	
        }else if($scope.userReg.number == "" || $scope.userReg.number == null){
		     swal(
					  'Oops...',
					  'Enter your valid vehicle registration number',
					  'error'
					); 	
        }else if($scope.userReg.type == "" || $scope.userReg.type == null){
		      swal(
					  'Oops...',
					  'Select your vehicle type',
					  'error'
					); 					
		}else if($scope.userReg.email == "" || $scope.userReg.email == null){
		      swal(
					  'Oops...',
					  'Enter your valid e-mail address',
					  'error'
					);
		}else if($scope.userReg.pwd == "" || $scope.userReg.pwd == null){
		     swal(
					  'Oops...',
					  'Enter a valid password',
					  'error'
					); 
		}else{
		   UserService.doRegister($scope.userReg)
		    .then(function(response){
				  if(response.status === 200){
  					$scope.user = response.data;
  					StorageService.add($scope.user);
            $ionicPush.register().then(function(t){
              return $ionicPush.saveToken(t);
            }).then(function(t){
              UserService.saveToken(t.token).then(function(response){
                console.log('Token saved: ', t.token);
              }, function(err){
                console.log(err);
              });
            });
  					$state.go('menu.home',null, {location: 'replace'});
				  }
			  },function(errResponse){
			  //alert(JSON.stringify(errResponse));
		 });
		}
	 };
});
