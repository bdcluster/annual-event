(function(){
  'use strict';
  angular.module('LotteryModule', []).controller('LotteryController', [
    '$rootScope', '$scope','$location', 'C', function(
     $rootScope,   $scope,  $location,   C){

    var storage = C.storage();

    $rootScope.hideNav = false;
    $scope.lotteryInfo = storage.get('lottery');
    $scope.currentLevel=function(level){
      storage.set('level', level);
    };
    $scope.noLottery = function(index){
      return storage.get('invalidLottery').indexOf(index)!==-1;
    }
  }]);
})();