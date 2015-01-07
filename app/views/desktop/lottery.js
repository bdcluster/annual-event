(function(){
  'use strict';
  angular.module('LotteryModule', []).controller('LotteryController', [
    '$rootScope','$scope','$location', 'AMS', 'C', function(
     $rootScope,  $scope,  $location,   AMS,   C){
    
    AMS.get({endpoint: 'lottery'}, function(r){
      $scope.lotteryInfo = r.data;
      console.log($scope.lotteryInfo)
    });
    
  }]);
})();