'use strict';

angular.module('meanApp')
  .directive('adminPanel', () => ({
    templateUrl: 'components/admin-panel/admin-panel.html',
    restrict: 'E',
    controller: 'AdminPanelController',
    controllerAs: 'admin',
    scope: {
          menu: '='
      },
    link: function(scope, element) {
        element.addClass('admin__panel');
      }
  }));