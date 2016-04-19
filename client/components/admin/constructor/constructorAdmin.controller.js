'use strict';

class ConstructorAdminController {

  constructor($http) {
    console.debug('ConstructorAdminController is loaded!');

    var pages = this;

  }
    
}

angular.module('meanApp')
  .controller('ConstructorAdminController', ConstructorAdminController);