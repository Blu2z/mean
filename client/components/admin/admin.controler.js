'use strict';

class AdminController {

  constructor(Notification, $state, $rootScope, AdminService) {
    var admin = this;

    console.debug('AdminController is loaded!');

    admin.data = [];
    admin.notification = Notification;
    admin.$rootScope = $rootScope;
    admin.$rootScope.isAdmin = $rootScope.isAdmin || 0;
    admin.adminService = AdminService;


    admin.getData = function () {
      admin.adminService.transport( '/api/admin', 'get', null, (data) => {
        admin.data = data;
        admin.$rootScope.isAdmin = 1;
        $state.go('admin.main');
      })
    }

    admin.getData();
  }
}

angular.module('meanApp')
  .controller('AdminController', AdminController);