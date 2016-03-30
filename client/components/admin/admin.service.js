'use strict';

class AdminService {

  constructor($http, Notification, $state) {
    var vm = this;

    vm.notification = Notification;
    vm.state = $state;

    return {
      transport (url, method, obj = {}, done = false, fail = false ) {
        // console.debug(obj);
        $http[method](url, obj)
          .then(response => {
            if(response.data.notAdmin) {
              vm.notification.error({message: 'Необходима авторизация!', delay: 2500});
              vm.state.go('login');
            } else {
              // vm.notification.success({message: 'Данные успешно удалены из базы!', delay: 1500});
              // console.debug(response);
              done ? done(response.data) : true;
            }
          }, response => {
            fail ? fail() : vm.notification.error({message: response.message ? response.message : 'Ошибка соединения: ' + response.status, delay: 2500});
          });
      }
    }
  }
}

angular.module('meanApp')
  .service('AdminService', AdminService);
