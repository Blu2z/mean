'use strict';

class LoginController {

  constructor($http, Notification, $state) {
    var login = this;

    console.debug('LoginController is loaded!');

    login.$http = $http;
    login.$state = $state; 
    login.notification = Notification;  
  }

  authorization() {
      console.log('logIn');
      if (this.form) {
        this.$http.post('/login', { 
          email: this.form.email,
          password: this.form.password,
          remember: this.form.remember
        }).success(response => {
            console.debug(response);
            if(response.isAdmin) {
              this.notification.success({message: 'Добро пожаловать!', delay: 1500});
              this.$state.go('admin');
            } else {
              this.notification.error({message: response.error, delay: 2500});
            }
        }).error(response => {
          console.debug(response);
          this.notification.error({message: response ? response : 'Ошибка соединения!', delay: 2500});
        });
      }
    }
}

angular.module('meanApp')
  .controller('LoginController', LoginController);