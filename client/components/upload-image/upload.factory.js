'use strict';

// class Files {
//   constructor($resource) {
// 	 return $resource('/files/:fileId', {fileId:'@id'}, {
//         add: {method: 'PUT'}
//     });
//   }
// }

// angular.module('meanApp')
//   .factory('Files', Files);



(function() {

function Files($resource) {
  return $resource('http://tamtakoe.ru/uploader/action.php/files/:fileId', {fileId:'@id'}, {
        add: {method: 'PUT'}
    });
}

angular.module('meanApp')
  .factory('Files', Files);

})();