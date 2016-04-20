'use strict';

class FooterController {

  constructor($state, $rootScope) {
    console.debug('FooterController is loaded!');

    var footer = this;

    footer.state = $state;
    footer.hide = true;

    $rootScope.$on('$stateChangeSuccess', 
      () => { 

        footer.hide = (footer.state.current.name.indexOf("admin") !== -1) ? false : true;

      });
  }
}

angular.module('meanApp')
  .controller('FooterController', FooterController);
