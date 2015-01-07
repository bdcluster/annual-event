(function(){
  'use strict';
  angular.module('GoodLuckModule', []).controller('GoodLuckController', [
    '$rootScope', '$scope','$location', 'AMS', 'C', '$interval', function(
     $rootScope,   $scope,  $location,   AMS,   C,   $interval){

    var storage = C.storage(), index;
    var staff = storage.get('staff');
    var lottery = storage.get('lottery')

    $rootScope.hideNav = false;
    $rootScope.levelAction = '抽取' + angular.copy(lottery)[storage.get('level')].level;
    $rootScope.getLuck = function(){
      angular.element(document.querySelectorAll('.lucky-man')).removeClass('lucky-man');
      $interval(function(){
        index = Math.ceil(Math.random() * staff.length) -1;
        // console.log(index)
        angular.element(document.getElementById('luckList')).children().eq(index).addClass('zoomIn')
      }, 100, 50).then(function(){
        angular.element(document.querySelectorAll('.zoomIn')).removeClass('zoomIn');
        AMS.get({endpoint: 'lucky', chaos: Math.random()}, function(res){
          angular.element(document.querySelector('[data-id="'+res.id+'"]')).addClass('lucky-man');
        });
      });
    };

    $scope.staff = angular.copy(staff);
    
  }]);
})();