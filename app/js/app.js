(function(){
  'use strict';
  var viewPath = "/views";
  angular.module('AmsApp', [
    'ngRoute',
    'ngResource',
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
      .when('/portal', {
        templateUrl: viewPath + '/desktop/portal.html',
        controller:  'PortalController'
      })
      .when('/lottery', {
        templateUrl: viewPath + '/desktop/lottery.html',
        controller:  'LotteryController'
      })
      .when('/goodLuck', {
        templateUrl: viewPath + '/desktop/good_luck.html',
        controller:  'GoodLuckController'
      })
      .when('/awards', {
        templateUrl: viewPath + '/desktop/awards.html',
        controller:  'AwardsController'
      })
      .when('/group', {
        templateUrl: viewPath + '/desktop/group.html',
        controller:  'GroupController'
      })
      .when('/final', {
        templateUrl: viewPath + '/desktop/final.html',
        controller:  'FinalController'
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