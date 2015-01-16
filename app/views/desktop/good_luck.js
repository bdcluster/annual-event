(function(){
  'use strict';
  angular.module('GoodLuckModule', []).controller('GoodLuckController', [
    '$rootScope', '$scope','$location', 'AMS', 'C', '$interval', function(
     $rootScope,   $scope,  $location,   AMS,   C,   $interval){

    $rootScope.wild = true;
    $rootScope.showBg = false;
    var storage = C.storage(), index;
    var staff = storage.get('staff');
    var curLottery = storage.get('curLottery');

    $rootScope.disableLottery = false;
    $rootScope.levelAction = curLottery.level;
    $rootScope.getLuck = function(){
      var self = this, luckyIndex;
      self.disableLottery = true;
      $scope.showLucky = false;
      //angular.element(document.querySelectorAll('.lucky-man')).removeClass('lucky-man');
      AMS.get({endpoint: 'lucky', id: curLottery.id}, function(res){
        if(res.success){
          luckyIndex = document.querySelector('[data-id="'+res.data.id+'"]').dataset['index'] - 0;
          
          $rootScope.cancelLucky=function(){
            AMS.get({endpoint: 'luckless', id:res.data.id}, function(){
              //luckyMan.removeClass('lucky-man');
            });
          };

          $interval(function(){
            index = Math.ceil(Math.random() * staff.length) -1;
            angular.element(document.getElementById('luckList')).children().eq(index).addClass('zoomIn')
          }, 100, 50).then(function(){
            angular.element(document.querySelectorAll('.zoomIn')).removeClass('zoomIn');
            $scope.luckyMan = $scope.staff[luckyIndex];
            $scope.showLucky = true;
            /*luckyMan.addClass('lucky-man');*/
            self.disableLottery = false;
          });
        } else {
          alert(res.code);
          self.disableLottery = false;
        }
      });

    };

    $scope.staff = angular.copy(staff);
    $scope.showLucky = false;

  }]);
})();