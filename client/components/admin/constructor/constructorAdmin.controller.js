'use strict';

class ConstructorAdminController {

  constructor($http) {
    console.debug('ConstructorAdminController is loaded!');

    var pages = this;

    pages.grids = [
    	{name: 'one', url: 'components/grids/one.html', img: 'assets/images/grid-1.jpg'},
    	{name: 'two', url: 'components/grids/two.html', img: 'assets/images/grid-2.jpg'},
    	{name: 'three', url: 'components/grids/three.html', img: 'assets/images/grid-3.jpg'},
    	{name: 'four', url: 'components/grids/four.html', img: 'assets/images/grid-4.jpg'}
    ];

    pages.grid = 0;
    // pages.currentGrid = `components/grids/${pages.name}.html`
  }



}

angular.module('meanApp')
  .controller('ConstructorAdminController', ConstructorAdminController);
