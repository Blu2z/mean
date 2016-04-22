'use strict';

angular.module('meanApp')
  .directive('map', function() {
    return {
      template: `<div class="content__title content__title--map">карта</div>
		<div class="map__wrap">
			<div ng-init="coords=[55.21, 34.30];center=[55.21, 34.30];zoom=10">
			    <yandex-map center="center" zoom="zoom">
			        <ymap-marker coordinates="coords"></ymap-marker>
			    </yandex-map>
			</div>
		</div>`,
      restrict: 'E',
	  	controller: function () {
	  		return false; 
	  	},
   		controllerAs: 'map'
    };
  });