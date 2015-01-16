(function(){
  'use strict';
  angular.module('GroupModule', []).controller('GroupController', [
    '$rootScope', '$scope', '$location', 'AMS', 'C', function(
     $rootScope,   $scope,   $location,   AMS,   C){

    var storage = C.storage();
    storage.remove('index');

    $rootScope.slideIn = false;
    $rootScope.wild = true;
    
    AMS.get({endpoint: 'groups'}, function(res){
      $scope.group = res.data;
    });

    $scope.setActive = function(i){
      storage.set('index', i);
      storage.bind($scope, 'index');
    };

    $scope.getActive = function(i){
      return i === storage.get('index');
    };

    $scope.vote = function(id, s, i){
      if(this.getActive(i)){
        AMS.get({endpoint: 'groups', id: id, status: s}, function(res){
          if(res.success){
            $scope.group = res.data;
          }
          else{
            alert(res.message)
          }
        });
      }
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