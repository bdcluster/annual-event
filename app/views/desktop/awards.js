(function(){
  'use strict';
  angular.module('AwardsModule', []).controller('AwardsController', [
    '$rootScope', '$scope', 'AMS', 'C', function(
     $rootScope,   $scope,   AMS,   C){

    var storage = C.storage();

    $rootScope.hideNav = false;
    AMS.get({endpoint:'luckylist'}, function(req){
      $scope.awards = req.data;
    });

  }]);
})();