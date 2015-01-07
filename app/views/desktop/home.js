(function(){
  'use strict';
  angular.module('HomeModule', []).controller('HomeController', [
    '$rootScope','$scope','$q','$location','AMS','C', function(
     $rootScope,  $scope,  $q,  $location,  AMS,  C){
    
    var storage = C.storage();

    $rootScope.hideNav = true;
    $scope.eventInit = function(){
      storage.clear();

      var lottery = AMS.get({endpoint: 'lottery'}, function(req){
        storage.set('lottery', req.data);
      }, function(){
        console.log('未能取得奖项数据！')
      });
      var staff = AMS.get({endpoint: 'staff'}, function(req){
        storage.set('staff', req.data);
      }, function(){
        console.log('未能获取人员数据！')
      });

      $q.all([lottery.$promise, staff.$promise]).then(function(){
        $location.path('/lottery');
      });
    };  
  }]);
})();