(function(){
  'use strict';
  angular.module('AmsControllers', [
    'HomeModule', 'PortalModule', 'LotteryModule', 'GoodLuckModule', 'AwardsModule', 'GroupModule', "FinalModule"
  ])
  .controller('GlobelController', [
    '$rootScope','$window','$location','AMS','C',function(
     $rootScope,  $window,  $location,  AMS,  C){

    $rootScope.wild = true;
    $rootScope.title = '中晴集团年会';
    $rootScope.hideNav = true;
    $rootScope.menus = [
      {name: '投票有理', path: 'group'},
      {name: '抽奖万岁', path: 'lottery'},
      {name: '中奖红榜', path: 'awards'}
    ]
    $rootScope.isActivedMenu = function(viewLocation){
      return viewLocation === $location.path();
    };
    $rootScope.isGoodLuckPage = function(){
      return '/goodLuck' === $location.path();
    }
  }]);
})();