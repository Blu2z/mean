'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  },{
    'title': 'About',
    'state': 'about'
  }];
  test = "dwdewdf";

  isCollapsed = true;
  //end-non-standard

  constructor() {
    }
}

angular.module('meanApp')
  .controller('NavbarController', NavbarController);
