'use strict';

angular.module('meanApp')
  .directive('ngDraggable', ($document) => ({
    link: function(scope, element, attr) {
			var startX = 0;
			var startY = 0;
			var deltaX = 0;
			var deltaY = 0;
			var el;

			element[0].addEventListener('dragenter', function dragEnter(e) {
				console.debug('dragenter');
			}, false);

			element.on('mousedown', function(event) {
				event.preventDefault();

				el = element.clone().appendTo("body").addClass('movable').attr('draggable', true);

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

					el.remove();
					$document.unbind('mousemove');
					$document.unbind('mouseup');
				});
			})
    }
  }));
