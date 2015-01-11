(function(){
  'use strict';
  angular.module('AmsMobiControllers', [])
  .controller('GlobelController', [
    '$rootScope',function(
     $rootScope){

    $rootScope.title = '中晴集团年会';
   
  }])
  .controller('VoteController', [
    '$rootScope', '$scope', '$location', 'AMS', function(
     $rootScope,   $scope,   $location,   AMS){

    AMS.get({endpoint: 'groups'}, function(res){
      var curAgainst=[], groups = res.data;
      for(var i=0; i<groups.length; i++){
        if(groups[i].status === 'ON'){
          curAgainst = groups[i].programs;
          break;
        }
      }
      if(curAgainst.length === 0){
        $scope.noVoteGroup = true;
      } else {
        curAgainst.length = 2;
        $scope.voteTitle = '16进8大战';
      }
      $scope.against = curAgainst;
    });

    $scope.chooseIt = function(id){
      $scope.programId = id;
      $scope.enableVote = true;
    }

    $scope.voteIt = function(e){
      AMS.get({endpoint: 'vote', id: $scope.programId}, function(req){
        if(req.success){
          alert('投票成功！');
          $location.path('#/home');
        }
      });
    };
    
  }]);
})();