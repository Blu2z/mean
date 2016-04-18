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
  'ui.sortable', 'ui.filters', 'ui.focusblur'
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
  .run(['$q', '$rootScope', '$state', '$http', '$urlRouter',
  function ($q, $rootScope, $state, $http, $urlRouter) {

    function constructTpl(argument) {
      console.debug(this);
      return '<div class="test" ng-include="\'' + this + '\'"></div>';
    };

    // ng-include="'app/view.html'"
    $http.get('api/states')
    .success(function(data) {
      angular.forEach(data, function (value, key) { 
          var state = {
            "url": value.url,
            "parent" : value.parent,
            "abstract": value.abstract,
            "template": constructTpl.call(value.templateUrl),
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
      // $state.go("main"); 
    });
}]);
