'use strict';

class ProfilePicController {

  constructor($window, $timeout, $scope, fileReader) {
    var crop = this;

    console.log('crop controller is loaded!', $scope, this);
    
    crop.getFile2 = function() {console.debug('click!');};

    crop.file = {};

    crop.getFile = function () {
      console.log('getFile() called.');
      console.log(crop.ajModel);
      console.log(crop.file);

      fileReader.readAsDataUrl(crop.file.file, $scope).then(function (result) {
        console.log('readAsDataUrl: result.length === ', result.length);
        //console.log(result);
        crop.imageSrc = result;
        $scope.imageSrc = result;
        $timeout(function () {
          crop.initJcrop();
        });
      });
    };

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

      console.log(crop.picWidth);
      console.log(crop.picHeight);

      console.log('scale');
      if (crop.picWidth > 400) {
        scale = (400 / crop.picWidth);
        console.log(crop.picHeight);
        crop.picHeight *= scale;
        crop.picWidth *= scale;
        console.log(scale);
      }

      if (crop.picHeight > 400) {
        scale = (400 / crop.picHeight);
        crop.picHeight *= scale;
        crop.picWidth *= scale;
        console.log(scale);
      }

      console.log('[cords]', crop.picWidth / crop.picHeight);
      console.log(cords);
      console.log(bounds);
      $scope.cropped = true;

      var rx = crop.picWidth / cords.w
        , ry = crop.picHeight / cords.h
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