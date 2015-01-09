(function(){
  'use strict';
  angular.module('AmsControllers', [])
  .controller('GlobelController', [
    '$rootScope','$window','$location','AMS',function(
     $rootScope,  $window,  $location,  AMS){

    $rootScope.title = '中晴集团年会';
   
  }]);
})();