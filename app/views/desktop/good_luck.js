(function(){
  'use strict';
  angular.module('GoodLuckModule', []).controller('GoodLuckController', [
    '$rootScope', '$scope','$location', 'AMS', 'C', '$interval', function(
     $rootScope,   $scope,  $location,   AMS,   C,   $interval){

    var storage = C.storage(), index;
    var staff = storage.get('staff');
    var lottery = storage.get('lottery');
    if(!storage.get('invalidLottery')) {
      storage.set('invalidLottery', []);
    }
    storage.bind($scope, 'invalidLottery');

    $rootScope.disableLottery = false;
    $rootScope.hideNav = false;
    $rootScope.levelAction = '抽取' + angular.copy(lottery)[storage.get('level')].level;
    $rootScope.getLuck = function(){
      var self = this, luckyMan;
      self.disableLottery = true;
      angular.element(document.querySelectorAll('.lucky-man')).removeClass('lucky-man');
      AMS.get({endpoint: 'lucky', chaos: Math.random()}, function(res){
        luckyMan = angular.element(document.querySelector('[data-id="'+res.id+'"]'));
        if(res.hasNext === 0) {
          $scope.invalidLottery.push(storage.get('level'));
        }
        $rootScope.cancelLucky=function(){
          AMS.get({endpoint: 'luckless', id:res.id}, function(){
            luckyMan.removeClass('lucky-man');
          });
        };

        $interval(function(){
          index = Math.ceil(Math.random() * staff.length) -1;
          // console.log(index)
          angular.element(document.getElementById('luckList')).children().eq(index).addClass('zoomIn')
        }, 100, 50).then(function(){
          angular.element(document.querySelectorAll('.zoomIn')).removeClass('zoomIn');
          luckyMan.addClass('lucky-man');
          self.disableLottery = false;
        });
      });

    };

    $scope.staff = angular.copy(staff);
    
  }]);
})();