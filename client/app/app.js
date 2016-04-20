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
      console.debug('==================');
      var txt = '';

      // var createRows = data => {return '<div class="row">' + data + '</div>'};
      // var createCol = (text, className) => {return '<div class="' + className + '">' + text + '</div>'};
      // var createTpl = name => {createCol('ng-include="\'' + name.view + '\'"', name.class)};

      var parseJson = function (data) {
          console.debug('parse', data);

        return _.forEach(data, function (value, key) {
          // console.log('foreach', key);

          if(value.view) { 
            console.debug('view!', value)
            txt += '<div class="' + value.class + '" ng-include="\'' + value.view + '\'"></div>'; 
            // console.debug('<div class="' + value.class + '" ng-include="\'' + value.view + '\'"></div>');
            // return '<div class="' + value.class + '" ng-include="\'' + value.view + '\'"></div>' ;
            
          }
          if(key === 'rows') { 
            console.debug('rows!', value)
            txt += '<div class="row">' + parseJson(value[0]) + '</div>';
            // console.debug( '<div class="row">' + parseJson(value[0]) + '</div>' );
            // return '<div class="row">' + parseJson(value[0]) + '</div>';
          }
          if(key === 'cols') { 
            console.debug('cols!', value)
            // txt += '' + parseJson(value)
            parseJson(value)
          }

          return

        })

        

      };

      parseJson(layout);
      console.debug(txt);

      return '<div class="test" ng-include="\'' + templateUrl + '\'"></div>';
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
