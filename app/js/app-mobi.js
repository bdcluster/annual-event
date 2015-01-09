(function(){
  'use strict';
  var viewPath = "/mobile";
  angular.module('AmsMobiApp', [
    'ngRoute',
    'ngResource',
    'AmsControllers',
    'AmsResources',
    'AmsServices'
  ])
  .config(['$routeProvider','$httpProvider', function($routeProvider, $httpProvider){

    $routeProvider
      .when('/home', {
        templateUrl: viewPath + '/home.html',
        controller:  'HomeController'
      })
      .when('/lottery', {
        templateUrl: viewPath + '/binding.html',
        controller:  'BindingController'
      })
      .when('/goodLuck', {
        templateUrl: viewPath + '/vote.html',
        controller:  'VoteController'
      })
      .otherwise({redirectTo: '/home'});

    $httpProvider.defaults.transformRequest = function(obj){
      var str = [];
      for(var p in obj){
        if(obj[p] !== null){
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
      }
      return str.join("&");
    };

    // HTTP POST
    $httpProvider.defaults.headers.post = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    //set localStorage type as sessionStorage
    //localStorageServiceProvider.setStorageType('sessionStorage');
    //$httpProvider.defaults.withCredentials = true;

  }]);
})();