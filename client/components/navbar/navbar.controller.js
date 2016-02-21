'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  },{
    'title': 'About',
    'state': 'about'
  },{
    'title': 'News',
    'state': 'news'
  },{
    'title': 'Admin',
    'state': 'admin'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor() {
    console.debug('NavbarController is loaded!');
    }
}

angular.module('meanApp')
  .controller('NavbarController', NavbarController);
