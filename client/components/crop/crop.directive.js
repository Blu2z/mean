'use strict';

var bounds = {};

angular.module('meanApp')
  .directive('imgCropped', function($window) {
    return {
      restrict: 'E',
      replace: true,
      scope: { src:'=', selected:'&' },
      //link: function (scope, element, attr) {
      link: function (scope, element) {
        var myImg
          , clear = function() {
              if (myImg) {
                myImg.next().remove();
                myImg.remove();
                myImg = undefined;
              }
            }
          ;

        scope.$watch('src', function (nv) {
          clear();
          console.log('watch');

          console.log('[src]');
          console.log(nv);
          if (!nv) return;

          element.after('<img style="max-width: 100%;"/>');
          myImg = element.next();
          console.log(myImg);
          myImg.attr('src', nv);


          $window.jQuery(myImg).Jcrop({ 
            // trackDocument: true, 
            onSelect: function(cords) {
                scope.$apply(function() {
                  scope.selected({cords: cords});
                });
              }, 
              aspectRatio: 1.333333333333333333
            }, function () {
              // console.log(this.container[0].clientWidth);
              // Use the API to get the real image size  
              // var boundsArr = this.getBounds();
              bounds.x = this.container[0].clientWidth;
              bounds.y = this.container[0].clientHeight;
            }
          );
        });
        
        scope.$on('$destroy', clear);
      }
      // controller: 'ProfilePicCtrl'
    };
  });

// // TODO create proper module
angular.module('meanApp')
  .factory("fileReader", function ($q) {
    var onLoad = function (reader, deferred, Sscope) {
      return function () {
        Sscope.$apply(function () {
          deferred.resolve(reader.result);
        });
      };
    };
    var onError = function (reader, deferred, Sscope) {
      return function () {
        Sscope.$apply(function () {
          deferred.reject(reader.result);
        });
      };
    };
    var onProgress = function (reader, Sscope) {
      return function (event) {
        Sscope.$broadcast(
          "fileProgress"
        , { total: event.total
          , loaded: event.loaded
          }
        );
      };
    };
    var getReader = function (deferred, Sscope) {
      var reader = new FileReader();
      reader.onload = onLoad(reader, deferred, Sscope);
      reader.onerror = onError(reader, deferred, Sscope);
      reader.onprogress = onProgress(reader, Sscope);
      return reader;
    };
    var readAsDataURL = function (file, Sscope) {
      var deferred = $q.defer();
      var reader = getReader(deferred, Sscope);
      reader.readAsDataURL(file);
      return deferred.promise;
    };
    return { readAsDataUrl: readAsDataURL };
  });

// angular.module('meanApp').directive("ajFileSelect", function () {
//   return {
//     scope: {
//       "ajChange": "&"
//     , "ajModel": "="
//     }
//   , link: function(scope, element, attrs) {
//       element.bind("change", function(e) {
//         console.debug(scope);
//         console.debug(attrs);
        
//         var file = {};

//         file.file = element.context.files[0];

//         attrs.ajModel = file;
//         console.log('ajFileSelect about to call getFile()', attrs.ajModel);
//         console.log(scope.ajChange);
//         // ProfilePicCtrl.getFile();
//       });
//     },
//     controller: 'ProfilePicController'
//   };
// });



angular.module('meanApp').directive("ajFileSelect", function () {
  return {
    scope: {
      "ajChange": "&"
    , "ajModel": "="
    }
  , link: function(scope, element) {
      element.bind("change", function(e) {
        scope.ajModel.file = (e.srcElement || e.target).files[0];
        console.log('ajFileSelect about to call getFile()', scope.ajModel);
        scope.ajChange();
      });
    }
  };
});

