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
  }];

  isCollapsed = true;
  //end-non-standard

  constructor() {
    }
}

angular.module('meanApp')
  .controller('NavbarController', NavbarController);
