(function(){
  'use strict';
  angular.module('AmsMobiControllers', [])
  .controller('GlobelController', [
    '$rootScope',function(
     $rootScope){

    $rootScope.title = '中晴集团年会';
   
  }])
  .controller('HomeController', [
    '$scope', '$location', 'AMS', function(
     $scope,   $location,   AMS){

    $scope.goVotePage = function(){
      AMS.get({endpoint: 'current'}, function(res){
        var step = res.data;
        if(step===1){
          $location.path('/vote');
        }
        if(step===2){
          $location.path('/voteFinal');
        }
      });
    };
    
  }])
  .controller('VoteController', [
    '$scope', '$location', 'AMS', function(
     $scope,   $location,   AMS){

    AMS.get({endpoint: 'groups'}, function(res){
      var curAgainst=[], groups = res.data;
      for(var i=0; i<groups.length; i++){
        if(groups[i].status === 'ON'){
          curAgainst = groups[i].programs;
          $scope.groupId=groups[i].id;
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
      AMS.get({endpoint: 'vote', action:'group',  id: $scope.programId, groupId: $scope.groupId}, function(req){
        if(req.success){
          alert('投票成功！');
          $location.path('#/home');
        }
        else {
          alert(req.message);
        }
      });
    };
    
  }])
  .controller('VoteFinalController', [
    '$scope', '$location', 'AMS', function(
     $scope,   $location,   AMS){

    $scope.voteTitle = '8强总决选';
    $scope.ids = [];
    AMS.get({endpoint: 'statistic'}, function(res){
      $scope.programs = res.data.programs;
    });

    $scope.chooseIt = function(id){
      var pos = this.ids.indexOf(id);
      if( pos > -1){
        this.ids.splice(pos, 1);
      } else if(this.ids.length < 3){
        this.ids.push(id);
      } else {
        alert('最多只能选3票哦！');
      }
      this.ids.length > 0 ? $scope.enableVote = true : $scope.enableVote = false;
    };

    $scope.voteIt = function(){
      AMS.get({endpoint: 'vote', action:'program', ids: $scope.ids.join(',')}, function(req){
        if(req.success){
          alert('投票成功！');
          $location.path('#/home');
        } else {
          alert(req.message)
        }
      });
    };
    
  }])
  .controller('BindController', [
    '$scope', '$location', 'AMS', function(
     $scope,   $location,   AMS){

    $scope.formdata = {show:true, avatar:''};
    var canvas = document.querySelector('#myCanvas'),
        ctx = canvas.getContext('2d'),
        img = document.querySelector('#imgFile');
    ctx.font = '14px/100px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#666';
    ctx.fillText('上传头像', 50, 50);

    angular.element(img).on('change', function(e){
      if (window.File && window.FileReader) {
        var f=e.target.files[0];
        if(f && f.type.match("image.*")){
          var reader = new FileReader(), w = 100;
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
              ctx.drawImage(image, 0, 0, w1, h1);
              angular.extend($scope.formdata, {avatar: canvas.toDataURL('image/png')});

              //rotate image action
              $scope.rotateImage = function(cw){
                var clockwise = cw || 1;
                ctx.clearRect(0, 0, w, w);
                ctx.translate(w/2, w/2);
                ctx.rotate(clockwise * Math.PI/2);
                ctx.translate(-w/2, -w/2)
                ctx.drawImage(image, 0, 0, w1, h1);
                angular.extend($scope.formdata, {avatar: canvas.toDataURL('image/png')});
              }

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

    $scope.submitInfo = function(e){
      if(!e.target.disabled && this.formdata.id > 0 && this.formdata.avatar.indexOf('data:image') === 0){
        e.target.disabled=true;

        AMS.reg({
          id: this.formdata.id,
          avatar: this.formdata.avatar
        }, function(req){
          if(req.success) {
            alert('上传成功！');
            $location.path('/home');
          }
        });
      } else {
        alert('请填写正确的资料');
        e.target.disabled=false;
      }
      // if(this.)
    };


    AMS.get({endpoint: 'staff'}, function(req){
      $scope.staff = req.data;
    }, function(){
      console.log('未能获取人员数据！')
    });
    
  }]);
})();