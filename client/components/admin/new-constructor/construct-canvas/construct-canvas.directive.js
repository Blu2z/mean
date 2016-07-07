'use strict';

angular.module('meanApp.constructor')
  .directive('construct-canvas', () => ({
    templateUrl: 'components/admin/new-constructor/construct-canvas/construct-canvas.html',
    restrict: 'E',
    controller: 'ConstructCanvasController',
    controllerAs: 'constructCanvas'
  }));