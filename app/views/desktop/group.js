(function(){
  'use strict';
  angular.module('GroupModule', []).controller('GroupController', [
    '$rootScope', '$scope', '$location', 'AMS', 'C', function(
     $rootScope,   $scope,   $location,   AMS,   C){

    var storage = C.storage();

    $rootScope.hideNav = false;
    
    AMS.get({endpoint: 'groups'}, function(res){
      $scope.group = res.data;
    });

    $scope.vote = function(id, s){
      AMS.get({endpoint: 'groups', id: id, status: s}, function(res){
        if(res.success){
          $scope.group = res.data;
        }
        else{
          alert(res.message)
        }
      });
    };

    $scope.goNextVote = function(){
      AMS.get({endpoint: 'nextVote'}, function(res){
        if(res.success){
          $location.path('/final');
        }
      })
    }

  }]);
})();