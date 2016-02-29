'use strict';

class UploadsController {

  constructor($scope, oiList, $resource, Files) {

     var url = '/api/news';
     // var Files =[];
        
        oiList($scope, url, Files, {fields: {thumb: 'files_thumb/preloader.gif'}});
        
        $scope.uploadoptions = {
          change: function (file) {

            //Создаем пустой элемент для будущего файла
            $scope.add('after', function (i, data) {
            
              file.$preview($scope.items[i]);


              // file.$upload(this.url, {});
          
              // file.$upload(url + data.id, $scope.items[i], data.settings).catch(function (data) {
              //     $scope.errors = angular.isArray($scope.errors) ? $scope.errors.concat(data.response) : [].concat(data.response);
              //     $scope.del($scope.getIndexById(data.item.id));
              //   });
            });
          }
        };
  }
}

angular.module('meanApp')
  .controller('UploadsController', UploadsController);




// angular.module('meanApp', ['ngResource', 'oi.file'])

    // .factory('Files', function ($resource) {
    //     return $resource('/files/:fileId', {fileId:'@id'}, {
    //         add: {method: 'PUT'}
    //     });
    // })

    // .controller('Uploads', ['$scope', 'Files', 'oiList', function ($scope, Files, oiList) {
        
    //     var url = '/api/news';
        
    //     oiList($scope, url, Files, {fields: {thumb: 'files_thumb/preloader.gif'}});
        
    //     $scope.uploadoptions = {
    //       change: function (file) {

    //         //Создаем пустой элемент для будущего файла
    //         $scope.add('after', function (i, data) {
            
    //           file.$preview($scope.items[i]);
          
    //           // file.$upload(url + data.id, $scope.items[i], data.settings).catch(function (data) {
    //           //     $scope.errors = angular.isArray($scope.errors) ? $scope.errors.concat(data.response) : [].concat(data.response);
    //           //     $scope.del($scope.getIndexById(data.item.id));
    //           //   });
    //         });
    //       }
    //     };
        
    //   //Выдаем либо абсолютный путь, либо относительный (data:... из fileReader) для кроссдоменных запросов
    //   // $scope.getUrl = function (item, name) {
    //   //   if (typeof item !== 'object') return '';
    //   //   return item._file === undefined ? '/uploader/' + item[name] : item[name];
    //   // };
    // }
    // ]);