(function(){
  'use strict';
  angular.module('HomeModule', []).controller('HomeController', [
    '$rootScope','$scope','$q','$location','AMS','C', function(
     $rootScope,  $scope,  $q,  $location,  AMS,  C){
    
    var storage = C.storage(), s;

    $rootScope.showBg = true;

    $scope.dataInit = function(){
      AMS.get({endpoint: 'start', start: 1}, function(req){
        if(req.success) {
          $scope.initStr = '初始化成功！';
        } else {
          alert(req.message);
        }
      }, function(){
        var errStr = '初始化不成功！';
        alert(errStr);
        console.log(errStr);
      });
    };

    $scope.eventInit = function(){
      AMS.get({endpoint: 'staff'}, function(req){
        storage.set('staff', req.data);
        $location.path('/portal');
      }, function(){
        console.log('未能获取人员数据！');
      });
    };  
  }]);
})();