(function(){
  'use strict';
  angular.module('FinalModule', []).controller('FinalController', [
    '$rootScope', '$scope', 'AMS', '$interval', function(
     $rootScope,   $scope,   AMS,   $interval){

    $rootScope.hideNav = false;
    
    AMS.get({endpoint: 'final', chaos: Math.random()}, function(req){
      $scope.votes = req.data;
    });

    $interval(function(){
      AMS.get({endpoint: 'final', chaos: Math.random()}, function(req){
        $scope.votes = req.data;
      });
    },5000)

  }]);
})();