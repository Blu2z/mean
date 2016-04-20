'use strict';

class NavbarController {
  //start-non-standard
  menu = [];

  isCollapsed = true;
  //end-non-standard

  constructor($http, $state, $rootScope) {
    console.debug('NavbarController is loaded!');

    var nav = this;

    nav.state = $state;
    nav.hide = true;

    $rootScope.$on('$stateChangeSuccess', 
      function(event, toState, toParams, fromState, fromParams){ 

        nav.hide = (nav.state.current.name.indexOf("admin") !== -1) ? false : true;

      });

     $http.get('/api/menu').then(response => {
      nav.menu = response.data;
    });
  }
}

angular.module('meanApp')
  .controller('NavbarController', NavbarController);
