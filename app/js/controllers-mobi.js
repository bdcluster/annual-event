(function(){
  'use strict';
  angular.module('AmsMobiControllers', [])
  .controller('GlobelController', [
    '$rootScope',function(
     $rootScope){

    $rootScope.title = '中晴集团年会';
   
  }])
  .controller('VoteController', [
    '$rootScope', '$scope', '$location', 'AMS', function(
     $rootScope,   $scope,   $location,   AMS){

    AMS.get({endpoint: 'groups'}, function(res){
      var curAgainst=[], groups = res.data;
      for(var i=0; i<groups.length; i++){
        if(groups[i].status === 'ON'){
          curAgainst = groups[i].programs;
          break;
        }
      }
      if(curAgainst.length === 0){
        $scope.noVoteGroup = true;
      } else {
        curAgainst.length = 2;
        $scope.voteTitle = '16进8大战';
        $scope.against = curAgainst;
        $scope.showPK = true;
      }
    });

    $scope.chooseIt = function(id){
      $scope.programId = id;
      $scope.enableVote = true;
    }

    $scope.voteIt = function(e){
      AMS.get({endpoint: 'vote', id: $scope.programId}, function(req){
        if(req.success){
          alert('投票成功！');
          $location.path('#/home');
        }
      });
    };
    
  }])
  .controller('BindController', [
    '$scope', 'AMS', function(
     $scope,   AMS){

    $scope.formdata = {show:true};
    var ctx = document.querySelector('#myCanvas').getContext('2d'),
        img = document.querySelector('#imgFile');
    ctx.font = '14px/65px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#666';
    ctx.fillText('上传头像', 33, 40);

    angular.element(img).on('change', function(e){
      if (window.File && window.FileReader) {
        var f=e.target.files[0];
        if(f && f.type.match("image.*")){
          var reader = new FileReader(), w = 65;
          reader.readAsDataURL(f);

          reader.onload = function(evt){
            var img = evt.target.result;
            var image = new Image();
            image.onload = function(){
              var ow = image.width, oh = image.height, w1, h1;
              if(ow > oh) {
                h1 = w;
                w1 = h1 * ow / oh;
              } else {
                w1 = w;
                h1 = w1 * oh / ow;
              }
              ctx.clearRect(0, 0, w, w);
              ctx.translate(w/2, w/2);
              // ctx.rotate(-Math.PI/2);
              ctx.translate(-w/2, -w/2)
              ctx.drawImage(image, 0, 0, w1, h1);

            }
            image.src = img;

          }
        } else {
          alert('只能上传图片！');
        }
      } else {
        alert('上传失败！');
      }
    });


    AMS.get({endpoint: 'staff'}, function(req){
      $scope.staff = req.data;
    }, function(){
      console.log('未能获取人员数据！')
    });
    
  }]);
})();