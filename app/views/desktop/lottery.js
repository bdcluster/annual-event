(function(){
  'use strict';
  angular.module('LotteryModule', []).controller('LotteryController', [
    '$rootScope', '$scope','AMS', 'C', function(
     $rootScope,   $scope,  AMS,   C){

    var storage = C.storage();
    $rootScope.slideIn = false;
    $rootScope.wild = false;
    $rootScope.showBg = false;

    AMS.get({endpoint: 'lottery'}, function(req){
      $scope.lotteryInfo = req.data;
    }, function(){
      console.log('未能取得奖项数据！');
    });

    $scope.currentLevel=function(id, level){
      storage.set('curLottery', {level: level, id: id});
    };
    
  }]);
})();