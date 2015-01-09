(function(){
  'use strict';
  angular.module('FinalModule', []).controller('FinalController', [
    '$rootScope', '$scope', 'AMS', '$interval', function(
     $rootScope,   $scope,   AMS,   $interval){

    $rootScope.hideNav = false;
    
    var statistic = function(){
      AMS.get({endpoint: 'statistic', chaos: Math.random()}, function(req){
        $scope.votes = req.data.programs;
        $scope.totalVotes = req.data.total;
        $scope.topCount = $scope.votes[0].count;
      });
    };
    statistic();
    $interval(statistic,2000);

  }]);
})();