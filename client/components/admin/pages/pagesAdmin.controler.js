'use strict';

class AdminPagesController {

  constructor($http, $state) {
    console.debug('AdminPagesController is loaded!');

    var pages = this;

    pages.$http = $http;
    pages.state = $state;

    pages.getNew = function () {
      pages.state.go("admin.pages.constructor", {page: 'new'});
    };

    pages.getData = function () {
      $http.get('/api/app').then(response => {
        pages.data = response.data[0].pages;
        // console.debug(response.data);
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