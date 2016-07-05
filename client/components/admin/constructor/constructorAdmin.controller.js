'use strict';

class ConstructorAdminController {

  constructor($http) {
    console.debug('ConstructorAdminController is loaded!');

    var pages = this;

    pages.grids = [
      {name: 'one', url: 'components/grids/one.html', img: 'assets/images/grid-1.jpg'},
      {name: 'two', url: 'components/grids/two.html', img: 'assets/images/grid-2.jpg'},
      {name: 'three', url: 'components/grids/three.html', img: 'assets/images/grid-3.jpg'},
      {name: 'four', url: 'components/grids/four.html', img: 'assets/images/grid-4.jpg'},
      {name: 'five', url: 'components/grids/five.html', img: 'assets/images/grid-5.jpg'}
    ];

    pages.modules =  [
      {name: 'header', url: 'components/grids/one.html', img: 'assets/images/grid-1.jpg'},
      {name: 'footer', url: 'components/grids/two.html', img: 'assets/images/grid-2.jpg'},
      {name: 'news', url: 'components/grids/three.html', img: 'assets/images/grid-3.jpg'},
      {name: 'info', url: 'components/grids/four.html', img: 'assets/images/grid-4.jpg'}
    ];

    pages.grid = 0;
  }
}

angular.module('meanApp')
  .controller('ConstructorAdminController', ConstructorAdminController);
