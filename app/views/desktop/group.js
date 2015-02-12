(function(){
  'use strict';
  angular.module('GroupModule', []).controller('GroupController', [
    '$rootScope', '$scope', '$location', '$timeout', 'AMS', 'C', function(
     $rootScope,   $scope,   $location,   $timeout,   AMS,   C){

    var storage = C.storage();
    storage.remove('index');

    $rootScope.slideIn = false;
    $rootScope.wild = true;
    $rootScope.showBg = false;
    
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
            // var viewPanel = document.querySelector('.group:nth-child(7)');
            // console.log(storage.get('index'));
            $timeout(function(){
              document.querySelector('.group:nth-child(' + (storage.get('index') + 1) + ')').scrollIntoView();
            },100);
          }
          else{
            alert(res.message);
          }
        });
      }
    };

    $scope.goNextVote = function(){
      AMS.get({endpoint: 'next', action: 'voting'}, function(res){
        if(res.success){
          $location.path('/final');
        }
        else{
          alert('16进8投票还在进行！');
        }
      });
    };

  }]);
})();