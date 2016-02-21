'use strict';

class AdminController {

  constructor($http, Notification, $state, $rootScope) {
    var admin = this;

    console.debug('AdminController is loaded!');

    admin.$http = $http;
    admin.data = [];
    admin.notification = Notification;
    admin.$rootScope = $rootScope;
    admin.$rootScope.isAdmin = $rootScope.isAdmin || 0;


    admin.getData = function () {
      console.debug('getData');

      $http.get('/api/admin').then(response => {
        admin.data = response.data;
        admin.$rootScope.isAdmin = 1;

        if(response.data.notAdmin) {
          $rootScope.isAdmin = 0;
          admin.notification.error({message: 'Необходима авторизация!', delay: 2500});
          $state.go('login');
        };

      });
    }

    admin.getData();
  }
}

angular.module('meanApp')
  .controller('AdminController', AdminController);