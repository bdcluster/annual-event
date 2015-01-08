(function(){
  'use strict';
  angular.module('GroupModule', []).controller('GroupController', [
    '$rootScope', '$scope', 'AMS', 'C', function(
     $rootScope,   $scope,   AMS,   C){

    var storage = C.storage();

    $rootScope.hideNav = false;
    
    AMS.get({endpoint: 'group'}, function(res){
      $scope.group = res.data;
    });

    $scope.vote = function(id, s){
      AMS.get({endpoint: 'group', id: id, status: s}, function(res){
        $scope.group = res.data;
      });
    };

  }]);
})();