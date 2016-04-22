'use strict';

angular.module('meanApp')
  .directive('news', () => ({
    templateUrl: 'components/news/news.html',
    restrict: 'E',
    controller: 'NewsController',
    controllerAs: 'news'
  }));
