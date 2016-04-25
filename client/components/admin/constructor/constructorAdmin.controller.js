'use strict';

class ConstructorAdminController {

  constructor($http) {
    console.debug('ConstructorAdminController is loaded!');

    var pages = this;

    pages.name = "one";
  }
    
}

angular.module('meanApp')
  .controller('ConstructorAdminController', ConstructorAdminController);