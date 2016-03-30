'use strict';

class AdminPagesController {

  constructor($http) {
    console.debug('AdminPagesController is loaded!');

    var pages = this;

    pages.$http = $http;

    pages.getData = function () {
      $http.get('/api/states').then(response => {
        pages.data = response.data;
        console.debug(response.data);
      },
      response => {
        this.notification.error({message: 'Ошибка соединения!', delay: 2500});
      });
    };

    pages.getData();
  }
    
}

angular.module('meanApp')
  .controller('AdminPagesController', AdminPagesController);