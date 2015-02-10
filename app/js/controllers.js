(function(){
  'use strict';
  angular.module('AmsControllers', [
    'HomeModule', 'PortalModule', 'LotteryModule', 'GoodLuckModule', 'AwardsModule', 'GroupModule', "FinalModule", "BlackListModule"
  ])
  .controller('GlobelController', [
    '$rootScope','$window','$location','AMS','C',function(
     $rootScope,  $window,  $location,  AMS,  C){

    $rootScope.imgroot = 'http://10.11.40.168:8080/activity';

    $rootScope.wild = true;
    $rootScope.slideIn = false;
    $rootScope.title = '中晴集团年会';
    $rootScope.menus = [
      {name: '投票', path: 'group'},
      {name: '抽奖', path: 'lottery'},
      {name: '中奖结果', path: 'awards'}
    ];
    $rootScope.isActivedMenu = function(viewLocation){
      return viewLocation === $location.path();
    };
    $rootScope.isGoodLuckPage = function(){
      return '/goodLuck' === $location.path();
    };
    $rootScope.showSlide = function(e){
      if(e.clientX / document.body.clientWidth > 0.95 && !this.slideIn){
        this.slideIn = true;
      }
    };
    $rootScope.hideSlide = function(e){
      if(e.clientX - document.body.clientWidth < -270 && this.slideIn){
        this.slideIn = false;
      }
    };
  }]);
})();