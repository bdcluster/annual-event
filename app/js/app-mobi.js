(function(){
  'use strict';
  var viewPath = "/mobile";
  angular.module('AmsMobiApp', [
    'ngRoute',
    'ngTouch',
    'ngResource',
    'LocalStorageModule',
    'AmsServices',
    'AmsResources',
    'AmsMobiControllers'
  ])
  .run(['$rootScope', '$location', 'C', function($rootScope, $location, C) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
      var isLogged, storage = C.storage();
      (storage.get('auth') !== null && storage.get('auth').length === 11) ? isLogged = true : isLogged = false;
      if (nextRoute.access && nextRoute.access.requiredLogin && !isLogged) {
        $location.path('/bind');
      }
    });
  }])
  .config(['$routeProvider','$httpProvider', function($routeProvider, $httpProvider){

    $routeProvider
      .when('/home', {
        templateUrl: viewPath + '/home.html',
        controller: "HomeController",
        access: { requiredLogin: true }
      })
      .when('/vote', {
        templateUrl: viewPath + '/vote.html',
        controller:  'VoteController',
        access: { requiredLogin: true }
      })
      .when('/voteFinal', {
        templateUrl: viewPath + '/vote-final.html',
        controller:  'VoteFinalController',
        access: { requiredLogin: true }
      })
      .when('/bind', {
        templateUrl: viewPath + '/bind.html',
        controller:  'BindController',
        access: { requiredLogin: false }
      })
      .when('/login', {
        templateUrl: viewPath + '/login.html',
        controller:  'LoginController',
        access: { requiredLogin: false }
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