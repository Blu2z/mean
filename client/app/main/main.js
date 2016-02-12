'use strict';

angular.module('meanApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('about', {
        url: '/about',
        resolve: {
          $title: function() { 
            return "About"; 
          }
        },
        templateUrl: 'components/about/about.html',
        controller: 'AboutController',
        controllerAs: 'about'
      })
      .state('news', {
        url: '/news',
        resolve: {
          $title: function() { 
            return "News";
          }
        },
        templateUrl: 'components/news/news.html',
        controller: 'NewsController',
        controllerAs: 'news'
      });
  });
