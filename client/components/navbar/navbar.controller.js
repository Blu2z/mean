'use strict';

class NavbarController {
  //start-non-standard
  menu = [];

  isCollapsed = true;
  //end-non-standard

  constructor($http, $state) {
    console.debug('NavbarController is loaded!');

    var nav = this;

    nav.state = $state;

    console.log(nav.state);

     $http.get('/api/menu').then(response => {
      nav.menu = response.data;
    });
  }
}

angular.module('meanApp')
  .controller('NavbarController', NavbarController);
