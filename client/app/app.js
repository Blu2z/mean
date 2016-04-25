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
  'ymaps'
])
  .config(function($urlRouterProvider, $locationProvider, $stateProvider) {  

    $urlRouterProvider.deferIntercept();

    $urlRouterProviderRef = $urlRouterProvider;
    
    // $locationProvider.html5Mode(false);
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
    }); 
  });

// class getStates {

//   constructor(q, $rootScope, $state, $http, AdminService) {
//     $http.get('/api/things').then(response => {})
//   }
// }

// angular.module('meanApp')
//   .run('getStates', getStates);

angular.module('meanApp')
  .run(['$q', '$rootScope', '$state', '$http', '$urlRouter', '_',
  function ($q, $rootScope, $state, $http, $urlRouter, _) {

    function constructTpl(templateUrl, layout) {
      if(!layout) {
        return '<div class="test" ng-include="\'' + templateUrl + '\'"></div>';
      }

      // var result = '';
      // console.debug(layout);

      var parseLayout = function (data) {
        var txt = '';
        var child, cls;

        angular.forEach(data, function (value, key) {

          cls = value.class ? 'class="' + value.class + '"' : '';
          child = value.children ? parseLayout(value.children) : '';

          if (data[1]) {
            txt += `<${value.tag} ${cls}>${child}</${value.tag}>`
            // console.debug('+=');
            // result += txt;
          } else {
            txt = `<${value.tag} ${cls}>${child}</${value.tag}>`
            
          }
          // console.debug('data: ', data);
          // console.debug('txt: ', txt);
        });
        
        return txt
      };

      // console.debug('result: ', result);
      return parseLayout(layout);
    };

    function constructCtrl (layout) {
       
    }

    // ng-include="'app/view.html'"
    $http.get('api/app')
    .success(function(data) {
      angular.forEach(data[0].pages, function (value, key) { 
          var state = {
            "url": value.url,
            "parent" : value.parent,
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
