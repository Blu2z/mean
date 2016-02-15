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
      })
      .state('login', {
        url: '/login',
        resolve: {
          $title: function() { 
            return "LogIn";
          }
        },
        templateUrl: 'components/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .state('admin', {
        url: '/admin',
        resolve: {
          $title: function() { 
            return "Admin-panel";
          }
        },
        templateUrl: 'components/admin/admin.html',
        controller: 'AdminController',
        controllerAs: 'admin'
      })
      .state('admin.newsedit', {
        url: '/news',
        resolve: {
          $title: function() { 
            return "Admin-panel";
          }
        },
        templateUrl: 'components/admin/news/news.html',
        controller: 'AdminNewsController',
        controllerAs: 'news'
      });
  });
