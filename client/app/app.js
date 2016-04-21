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
  'ui.focusblur'
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
        console.log('layout', layout);
        return '<div class="test" ng-include="\'' + templateUrl + '\'"></div>';
      }

      var all = '', temp='', row=0;
      var parseJson = function (data) {
        console.log(data);

        return _.forEach(data, function (value, key) {
          console.debug('val', value);

          if(value.view || key ==='views') { 
            temp += '<div class="' + value.class + '" ng-include="\'' + value.view + '\'"></div>';
          }
          if(key === 'rows' || value.rows) { 
            // row = 1;
            parseJson(value);
            all += '<div class="row">' + temp + '</div>';
          }
          if(key === 'cols' || value.cols) { parseJson(value) }
        })
      };

      parseJson(layout);
      console.debug(all);

      return '<div class="container__news">' + all + '</div>';

      // return '<div class="test" ng-include="\'' + templateUrl + '\'"></div>';
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
