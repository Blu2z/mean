'use strict';

class ConstructorController {

  constructor($rootScope, $state, AdminService, Notification) {
    console.debug('ConstructorController is loaded!');

    var construct = this;

    // проверяем параметр в урле. Если new - создаем новую страничку, иначе тянем с сервака json по id
    if ($state.params.page) {
      Notification.error({message: 'Отсутсвует url-параметр', delay: 2000});
      $state.go("admin.pages");
    } else if ($state.params.page === 'new') {
      //загружаем конфиг создания страницы
    } else {
      AdminService.transport('/api/app/pages' + $state.params.page, 'get', null, data => {

      }, data => {
        console.error('load the configuration of page is failed. Reason: ', data);
      })
    }


    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      console.log('stateChange');

    });

    pages.grids = [
      {name: 'one', url: 'components/grids/one.html', img: 'assets/images/grid-1.jpg'},
      {name: 'two', url: 'components/grids/two.html', img: 'assets/images/grid-2.jpg'},
      {name: 'three', url: 'components/grids/three.html', img: 'assets/images/grid-3.jpg'},
      {name: 'four', url: 'components/grids/four.html', img: 'assets/images/grid-4.jpg'},
      {name: 'five', url: 'components/grids/five.html', img: 'assets/images/grid-5.jpg'}
    ];

    //register directives
    pages.modules =  [
      {name: 'header', url: 'components/grids/one.html', img: 'assets/images/grid-1.jpg'},
      {name: 'footer', url: 'components/grids/two.html', img: 'assets/images/grid-2.jpg'},
      {name: 'news', url: 'components/grids/three.html', img: 'assets/images/grid-3.jpg'},
      {name: 'info', url: 'components/grids/four.html', img: 'assets/images/grid-4.jpg'}
    ];

    pages.grid = 0;

  }
}

angular.module('meanApp.constructor')
  .controller('ConstructorController', ConstructorController);
