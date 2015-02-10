(function(){
  'use strict';
  angular.module('BlackListModule', []).controller('BlackListController', [
    '$rootScope','$scope','$q','$location','AMS','C', function(
     $rootScope,  $scope,  $q,  $location,  AMS,  C){
    
    var storage = C.storage(), s;

    $rootScope.showBg = true;

    AMS.get({endpoint: 'staff'}, function(req){
      var pos = [], d = req.data;
      for(var i=0, x=d.length; i<x; i++){
        if(pos.indexOf(d[i].company)===-1) pos.push(d[i].company);
      }
      $scope.position = pos;
      $scope.staff = d;
    }, function(){
      console.log('未能获取人员数据！');
    });

    $scope.setToggle = function(e){
      var o = e.target;
      var id = o.dataset.uniq - 0;

      if(o.classList.contains('btn')){
        AMS.get({endpoint: 'toggle', id: id}, function(req){
          if(req.success){
            for(var i=0, x=$scope.staff.length; i<x; i++){
              if($scope.staff[i].id === id){
                $scope.staff[i].valid = !$scope.staff[i].valid;
                console.log($scope.staff[i].valid)
                break;
              }
            }
          }
        }, function(){
          console.log('someting wrong!');
        });
      }
      
    };

  }]);
})();