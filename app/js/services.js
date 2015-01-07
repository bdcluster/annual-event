(function(){
  'use strict';
  angular.module('AmsServices', [])

  .factory('C', [
    '$filter','$timeout','$window','$location','$rootScope','localStorageService',function(
     $filter,  $timeout,  $window,  $location,  $rootScope,  ls){

    return{
      storage: function(){
        var store;
        ls.isSupported ? store = ls : store = ls.cookie;
      
        return {
          set: function(key, val){
            return store.set(key, val);
          },
          get: function(key){
            return store.get(key);
          },
          remove: function(key){
            return store.remove(key);
          },
          clear: function(){
            return store.clearAll();
          }
        };
      }
    };
  }]);
})();