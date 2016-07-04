'use strict';

angular.module('meanApp')
  .directive('ngDroparea', ($document) => ({
    link: function (scope, element, attr) {

      element.context.ondragenter = function(e) {
        console.log('dragenter', this);
        element.addClass('hover');
      };

      element.context.ondragleave = function(e) {
        console.log('dragleave', this);
        element.removeClass('hover');
      };

      element.context.ondragstart = function(e) {
        console.log('dragenter');
      };

      console.debug(element);

      $document.on('dragOn', () => {
        element.on('dragEnter', () => {console.log('qqq')});

        element.hover(function() {element.addClass('hover')},
          function() {element.removeClass('hover')}
        );
      });
    }
}));
