'use strict';

var $urlRouterProviderRef = null;
var $stateProviderRef = null;

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
  'ui.sortable',
  'ui.filters',
  'ui.focusblur',
  'ezfb',
  'ymaps'
])
  .config(function($urlRouterProvider, $locationProvider, $stateProvider) {

    $urlRouterProvider.deferIntercept();
    $urlRouterProviderRef = $urlRouterProvider;
    $stateProviderRef = $stateProvider;

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
    })
  })
  .config(function(ezfbProvider) {
    ezfbProvider.setInitParams({
      appId: '485369794990134',
      xfbml: true,
      version: 'v2.6'
    });
  });

angular.module('meanApp')
  .run(['$http', '$urlRouter',
  function($http, $urlRouter) {

    function constructTpl(templateUrl, layout) {
    if (!layout) {return '<div class="test" ng-include="\'' + templateUrl + '\'"></div>';}

      var parseLayout = function(data) {
        var txt = '';
        var child, cls;

        angular.forEach(data, function(value, key) {

          cls = value.class ? `class="${value.class}"` : '';
          child = value.children ? parseLayout(value.children) : '';
          txt = (data[1])
            ? txt + `<${value.tag} ${cls}>${child}</${value.tag}>`
            : `<${value.tag} ${cls}>${child}</${value.tag}>`;
        });
        return txt
      };
      return parseLayout(layout);
    };

    function constructCtrl(layout) {}

    $http.get('api/app')
      .success(function(data) {
        angular.forEach(data[0].pages, function(value, key) {
            var state = {
              "url": value.url,
              "parent": value.parent,
              "abstract": value.abstract,
              "template": constructTpl(value.templateUrl, value.layout),
              // "template": constructTpl.call(value.templateUrl),
              // "templateUrl": constructTpl.call(value.templateUrl),
              "controller": value.controller,
              "controllerAs": value.controllerAs
            };

            // angular.forEach(value.views, function (view) {
            //   state.views[view.name] = {
            //     templateUrl : view.templateUrl,
            //   };
            // });

            $stateProviderRef.state(value.name, state);
        });

        $urlRouter.sync();
        $urlRouter.listen();

      });
}]);
