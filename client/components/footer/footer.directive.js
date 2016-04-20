'use strict';

angular.module('meanApp')
  .directive('footer', function() {
    return {
      templateUrl: 'components/footer/footer.html',
      restrict: 'E',
	  	controller: 'FooterController',
   		controllerAs: 'footer'
    };
  });
