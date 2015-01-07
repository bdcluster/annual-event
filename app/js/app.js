(function(){
  'use strict';
  var viewPath = "/views";
  angular.module('AmsApp', [
    'ngRoute',
    'ngLocale',
    'ngResource',
    'ui.bootstrap',
    'LocalStorageModule',
    'AmsControllers',
    'AmsDirectives',
    'AmsResources',
    'AmsServices',
    'AmsTemplate',
    'AmsFilters'
  ])
  .config(['$routeProvider','$httpProvider', 'localStorageServiceProvider', function($routeProvider, $httpProvider, localStorageServiceProvider){

    $routeProvider
      .when('/home', {
        templateUrl: viewPath + '/desktop/home.html',
        controller:  'HomeController'
      })
      .when('/lottery', {
        templateUrl: viewPath + '/desktop/lottery.html',
        controller:  'LotteryController'
      })
      .when('/goodLuck', {
        templateUrl: viewPath + '/desktop/good_luck.html',
        controller:  'GoodLuckController'
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