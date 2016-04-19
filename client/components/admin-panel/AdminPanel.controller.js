'use strict';

class AdminPanelController {
  //start-non-standard
  nav = [];
  //end-non-standard

  constructor(AdminService) {
    console.debug('AdminPanelController is loaded!');

    var admin = this;

    admin.getMenu = () => {
      AdminService.transport( '/api/admin/panel', 'get', null, (data) => {
        admin.nav = data;
      })
    };

    admin.getMenu();

  }
}

angular.module('meanApp')
  .controller('AdminPanelController', AdminPanelController);