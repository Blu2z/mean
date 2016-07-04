'use strict';

angular.module('meanApp')
  .directive('ngDraggable', ($document) => ({
    link: function (scope, element, attr) {
      var startX = 0;
      var startY = 0;
      var deltaX = 0;
      var deltaY = 0;
      var el;

      element.context.onclick = function (e) {console.log('click')};
      element.context.dragstart = function (e) {console.log('dragstart')};

      element.$on('dragstart', function (e) {
        console.log('dragstart');
      })


      element.on('mousedown', function (event) {
        // return false

        event.preventDefault();

        $document.trigger('dragOn', event);

        el = element.clone().appendTo("body").addClass('movable').attr('draggable', true);

        el.context.ondragStart = function (e) {
          console.log('dragStart');
        };

        startX = element.offset().left;
        startY = element.offset().top;

        deltaX = event.pageX - startX;
        deltaY = event.pageY - startY;

        el.css({
          position: 'absolute',
          cursor: 'move',
          top: startY + 'px',
          left: startX + 'px',
          zIndex: 9999
        });

        $document.on('mousemove', (event) => {
          var y = event.pageY;
          var x = event.pageX;

          el.css({
            top: y - deltaY + 'px',
            left: x - deltaX + 'px'
          });
        });

        $document.on('mouseup', (event) => {
          event.stopPropagation();

          $document.trigger('dragOff', event);

          el.remove();
          $document.unbind('mousemove');
          $document.unbind('mouseup');
        });
      })

      console.log(element);
    }
  }));
