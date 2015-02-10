(function(){
  'use strict';
  angular.module('HomeModule', []).controller('HomeController', [
    '$rootScope','$scope','$q','$location','AMS','C', function(
     $rootScope,  $scope,  $q,  $location,  AMS,  C){
    
    var storage = C.storage(), s;

    $rootScope.showBg = true;
    $scope.eventInit = function(){
      storage.clear();

      var start = AMS.get({endpoint: 'start', start: 1}, function(req){
        s = req.success;
      }, function(){
        console.log('未能取得奖项数据！');
      });

      var staff = AMS.get({endpoint: 'staff'}, function(req){
        storage.set('staff', req.data);
        // $location.path('/portal');
      }, function(){
        console.log('未能获取人员数据！');
      });

      $q.all([start.$promise, staff.$promise]).then(function(){
        if(s === true){
          $location.path('/portal');
        } 
      });
    };  
  }]);
})();