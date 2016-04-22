'use strict';

angular.module('meanApp')
  .directive('formabout', function() {
    return {
      templateUrl: 'components/about/formAbout.html',
      restrict: 'E',
	  	controller: function () {
	  		return false; 
	  	},
   		controllerAs: 'formabout'
    };
  });
