'use strict';

class AdminController {

  constructor($http, Notification) {
    var admin = this;

    admin.$http = $http;
    admin.data = [];
    admin.notification = Notification;

    admin.getData = function () {
      console.debug('getData');

      $http.get('/api/admin').then(response => {
        admin.data = response.data;
        console.debug(response);
        if(response.data.notAdmin) {
          admin.notification.error({message: 'Необходима авторизация!', delay: 2500});
        };
      });
    }

    admin.getData();
  }

  logIn() {
      console.log('logIn');
      if (this.login) {
        this.$http.post('/login', { 
          email: this.login.email,
          password: this.login.password,
          remember: this.login.remember
        }).success(response => {
            console.debug(response);
            if(response.isAdmin) {
              this.notification.success({message: 'Добро пожаловать!', delay: 1500});
              this.getData();
            } else {
              this.notification.error({message: response.data.error, delay: 2500});
            }
        }).error(response => {
          console.debug(response);
          this.notification.error({message: 'Ошибка соединения!', delay: 2500});
          this.testNews = '';
        });
      }
    }
}

angular.module('meanApp')
  .controller('AdminController', AdminController);