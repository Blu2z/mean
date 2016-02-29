'use strict';

angular.module('meanApp', [
  'meanApp.constants',
  'ngCookies',
  'ngResource',
  'ngAnimate',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ui-notification',
  'textAngular',
  'meanApp.util',
  'ui.fancybox',
  'meanApp.config',
  'oi.file',
  'oi.list',
  'ngResource',
  'ui.sortable', 'ui.filters', 'ui.focusblur'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .config(function(NotificationProvider) { 
    NotificationProvider.setOptions({ 
      delay: 10000, 
      startBottom: 20, 
      startLeft: 10, 
      verticalSpacing: 10, 
      horizontalSpacing: 20, 
      positionX: 'right', 
      positionY: 'bottom' 
    }); 
  });
