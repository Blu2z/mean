'use strict';

class ProfilePicController {

  constructor($window, $timeout, $scope, fileReader) {
    var crop = this;

    console.log('crop controller is loaded!', $scope, this);
    
    crop.getFile2 = function() {console.debug('click!');};

    crop.file = {};
    crop.getFile = function () {
      console.log('getFile() called.');
      console.log(scope.ajModel);
      console.log(scope.file);
      $scope.progress = 0;
      fileReader.readAsDataUrl(scope.file.file, $scope).then(function (result) {
        console.log('readAsDataUrl: result.length === ', result.length);
        //console.log(result);
        crop.imageSrc = result;
        $scope.imageSrc = result;
        $timeout(function () {
          crop.initJcrop();
        });
      });
    };

    $scope.$on("fileProgress", function(e, progress) {
      $scope.progress = progress.loaded / progress.total;
    });

    crop.initJcrop = function () {
      console.log('init jcrop');
      $window.jQuery('img.aj-crop').Jcrop({
        onSelect: function () {
          //$scope.$apply();
          console.log('onSelect', arguments);
        }
      , onChange: function () {
          //$scope.$apply();
          console.log('onChange', arguments);
        }
      , trackDocument: true
      , aspectRatio: 1.333333333333333333
      });
    };

    // http://plnkr.co/edit/Iizykd7UORy3po1h5mfm?p=preview
    crop.cropOpts = {
      ratioW: 1
    , ratioH: 1
    };
    $scope.selected = function (cords) {
      var scale
        ;

      crop.picWidth = cords.w;
      crop.picHeight = cords.h;

      console.log('scale');
      if (scope.picWidth > 400) {
        scale = (400 / scope.picWidth);
        console.log(scope.picHeight);
        crop.picHeight *= scale;
        crop.picWidth *= scale;
        console.log(scale);
      }

      if (scope.picHeight > 400) {
        scale = (400 / scope.picHeight);
        crop.picHeight *= scale;
        crop.picWidth *= scale;
        console.log(scale);
      }

      console.log('[cords]', scope.picWidth / scope.picHeight);
      console.log(cords);
      console.log(bounds);
      $scope.cropped = true;

      var rx = scope.picWidth / cords.w
        , ry = scope.picHeight / cords.h
        , canvas = document.createElement("canvas")
        , context = canvas.getContext('2d')
        , imageObj = $window.jQuery('img#preview')[0]
        ;


      $window.jQuery('.canvas-preview').children().remove();
      canvas.width = cords.w;
      canvas.height = cords.h;
      context.drawImage(imageObj, cords.x, cords.y, cords.w, cords.h, 0, 0, cords.w, cords.h);
      $window.jQuery('.canvas-preview').append(canvas);


      $window.jQuery('img#preview').css({
        width: Math.round(rx * bounds.x) + 'px',
        height: Math.round(ry * bounds.y) + 'px',
        marginLeft: '-' + Math.round(rx * cords.x) + 'px',
        marginTop: '-' + Math.round(ry * cords.y) + 'px'
      });
    };
  }

  getFile2 () {console.log('click!');};
}

angular.module('meanApp')
  .controller('ProfilePicController', ProfilePicController);