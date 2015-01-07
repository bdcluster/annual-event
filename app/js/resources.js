(function(){
  'use strict';
  angular.module('AmsResources', []).factory('AMS', [
    '$rootScope','$resource','$window','$location',function(
     $rootScope,  $resource,  $window,  $location){

    var normalPrarms = {};
    var url = 'http://127.0.0.1:8084/:endpoint/:action/:id';
    angular.extend(normalPrarms, {local:1, mock:1, enforce:1, chaos:Math.random()});

    return $resource(url, normalPrarms, {
      
    });
  }]);
})();