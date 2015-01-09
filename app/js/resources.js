(function(){
  'use strict';
  angular.module('AmsResources', []).factory('AMS', [
    '$rootScope','$resource','$window','$location',function(
     $rootScope,  $resource,  $window,  $location){

    var normalPrarms = {}, url;

    var evn = 0; 
    // 0: local, 1: dev, 2:test, 3:production
    if(evn === 0){
      url = 'http://127.0.0.1:8084/:endpoint/:action';
      angular.extend(normalPrarms, {local:1, mock:1, enforce:1, chaos:Math.random()});
    }
    if(evn === 1){
      url = 'http://10.10.40.87:8080/activity/:endpoint/:action';
    }

    return $resource(url, normalPrarms, {
      
    });
  }]);
})();