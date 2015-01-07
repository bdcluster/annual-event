(function(){
  'use strict';
  angular.module('AmsControllers', [
    'HomeModule', 'LotteryModule'
  ])
  .controller('GlobelController', [
    '$rootScope','$window','$location','AMS','C',function(
     $rootScope,  $window,  $location,  AMS,  C){

    $rootScope.title = '中晴集团年会';
    $rootScope.menus = [
      {name: '投票有理', path: 'vote'},
      {name: '抽奖万岁', path: 'lottery'},
      {name: '中奖红榜', path: 'awards'}
    ]
    $rootScope.isActivedMenu = function(viewLocation){
      return viewLocation === $location.path();
    };

  }]);
})();