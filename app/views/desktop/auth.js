(function(){
  'use strict';
  angular.module('AuthModule', []).controller('AuthController', [
    '$rootScope','$scope','$q','$location','AMS','C', function(
     $rootScope,  $scope,  $q,  $location,  AMS,  C){
    
    var storage = C.storage();

    $rootScope.showBg = true;

    $scope.checkAuth = function(){
      storage.set('auth', this.auth.str);
      $location.path('/home');
    };

    
  }]);
})();