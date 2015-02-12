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
    'AmsFilters'
  ])
  .run(['$rootScope', '$location', 'C', function($rootScope, $location, C) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
      var isLogged, storage = C.storage();
      (storage.get('auth') !== null && storage.get('auth') === 'wwssadadbaba') ? isLogged = true : isLogged = false;
      if (nextRoute.access && nextRoute.access.requiredLogin && !isLogged) {
        $location.path('/bind');
      }
    });
  }])
  .config(['$routeProvider','$httpProvider', 'localStorageServiceProvider', function($routeProvider, $httpProvider, localStorageServiceProvider){

    $routeProvider
      .when('/home', {
        templateUrl: viewPath + '/desktop/home.html',
        controller:  'HomeController',
        access: { requiredLogin: true }
      })
      .when('/portal', {
        templateUrl: viewPath + '/desktop/portal.html',
        controller:  'PortalController',
        access: { requiredLogin: true }
      })
      .when('/lottery', {
        templateUrl: viewPath + '/desktop/lottery.html',
        controller:  'LotteryController',
        access: { requiredLogin: true }
      })
      .when('/goodLuck', {
        templateUrl: viewPath + '/desktop/good_luck.html',
        controller:  'GoodLuckController',
        access: { requiredLogin: true }
      })
      .when('/awards', {
        templateUrl: viewPath + '/desktop/awards.html',
        controller:  'AwardsController',
        access: { requiredLogin: true }
      })
      .when('/group', {
        templateUrl: viewPath + '/desktop/group.html',
        controller:  'GroupController',
        access: { requiredLogin: true }
      })
      .when('/final', {
        templateUrl: viewPath + '/desktop/final.html',
        controller:  'FinalController',
        access: { requiredLogin: true }
      })
      .when('/black', {
        templateUrl: viewPath + '/desktop/blacklist.html',
        controller:  'BlackListController',
        access: { requiredLogin: true }
      })
      .when('/auth', {
        templateUrl: viewPath + '/desktop/auth.html',
        controller:  'AuthController',
        access: { requiredLogin: false }
      })
      .otherwise({redirectTo: '/auth'});

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