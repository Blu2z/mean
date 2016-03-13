'use strict';

// var bounds = {};

// angular.module('meanApp')
//   .directive('imgCropped', function($window) {
//     return {
//       restrict: 'E',
//       replace: true,
//       scope: { src:'=', selected:'&' },
//       //link: function (scope, element, attr) {
//       link: function (scope, element) {
//         var myImg
//           , clear = function() {
//               if (myImg) {
//                 myImg.next().remove();
//                 myImg.remove();
//                 myImg = undefined;
//               }
//             }
//           ;

//         scope.$watch('src', function (nv) {
//           clear();
//           console.log('watch');

//           console.log('[src]');
//           console.log(nv);
//           if (!nv) { // newValue
//             return;
//           }

//           element.after('<img style="max-width: 100%;"/>');
//           myImg = element.next();
//           myImg.attr('src', nv);
//           $window.jQuery(myImg).Jcrop(
//             { trackDocument: true
//             , onSelect: function(cords) {
//                 scope.$apply(function() {
//                   scope.selected({cords: cords});
//                 });
//               }
//             , aspectRatio: 1.333333333333333333
//             }
//           , function () {
//               // Use the API to get the real image size  
//               var boundsArr = this.getBounds();
//               bounds.x = boundsArr[0];
//               bounds.y = boundsArr[1];
//             }
//           );
//         });
        
//         scope.$on('$destroy', clear);
//       }
//       // controller: 'ProfilePicCtrl'
//     };
//   });

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
//       "ajChange": "&ajChange"
//     , "ajModel": "=ajModel"
//     }
//   , link: function(dirScope, el, $scope) {
//       el.bind("change", function(e) {
//         console.debug($scope);
//         var file = {};

//         file.file = el.context.files[0];

//         dirScope.ajModel = file;
//         console.log('ajFileSelect about to call getFile()', dirScope.ajModel);
//         console.log(dirScope.ajChange);
//         // ProfilePicCtrl.getFile();
//       });
//     },
//     controller: 'ProfilePicController'
//   };
// });


