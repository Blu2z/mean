'use strict';

class AdminPanelController {
  //start-non-standard
  menu = [{
    'title': 'Общие',
    'state': 'admin'
  },{
    'title': 'О нас',
    'state': 'admin/about'
  },{
    'title': 'Новости',
    'state': 'admin.newsedit'
  },{
    'title': 'Услуги',
    'state': 'admin/services'
  },{
    'title': 'Галерея',
    'state': 'admin/galerey'
  }];
  //end-non-standard

  constructor() {
    }
}

angular.module('meanApp')
  .controller('AdminPanelController', AdminPanelController);