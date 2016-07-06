'use strict';

angular.module('meanApp')
  .directive('ngDroparea', ($document, $compile, $rootScope, $state, DomParserService) => ({
    link: function (scope, element, attr) {
      // trash
      $('#treeTest').on('click', 'div', function (e) {
        e.stopPropagation();
        console.log('click');
        $(this).toggleClass('unshow');
      });

      var boxs = $(element).find('.testing-box');
      var drag = 0;
      var testbox, insertElement;
      var parser = DomParserService;

      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        console.log('stateChange');

        $document.off('dragOn');
      });

      $document.mousemove(e => {
        if (!drag) return;

        var box = $(e.toElement);

        // console.log('box: ', box);

        $(e.toElement).addClass('hover');


        // console.log('event: ', e)
      });

      $document.on('dragOn', (e, obj) => {
        testbox = 0;
        drag = 1;
        insertElement = obj;
        console.log('insertElement: ', insertElement);
      });

      $(boxs).each(function(ind, el) {
        // console.log($(el));

        // $(el).context.ondragenter = function(e) {
        //   if(drag) { $(el).addClass('hover');}
        // };

        $(el).context.onmouseenter = function(e) {
          if (drag) { $(el).addClass('hover');}
          // console.log('onmouseenter', e);
        }

        $(el).context.onmouseup = function(e) {
          if (drag) {
            var elem = angular.element(`\<${insertElement}\>\</${insertElement}\>`)

            $(el).append(elem);

            console.log($('li'));
            $('#treeTest').html(parser.toTree(parser.DOMtoJSON($('.view-container2')[0])));

            $compile(elem)(scope);

          }
          // console.log('onmouseup', insertElement);
        }

        $(el).context.onmouseleave = function(e) {
          if (drag) { $(el).removeClass('hover'); }
          // console.log('onmouseleave', drag);
        };

        // $(el).context.ondragleave = function(e) {
        //   if(drag) { $(el).removeClass('hover'); }
        // };
      })

      // element.context.ondragstart = function(e) {
      //   console.log('dragenter');
      // };

      // console.debug(element);

      $document.one('dragOff', (e, data) => {
        // console.log('off!');
        drag = 0;
        // console.log('off', data);
        // $document.off('dragOn');
      });

      // $document.on('dragOn', () => {
      //   console.log('dragOn');
      //
      //   element.on('dragEnter', () => {console.log('qqq')});
      //
      //   element.hover(function() {element.addClass('hover')},
      //     function() {element.removeClass('hover')}
      //   );
      // });
// ==========================
      

      // var testHtml = parser.toJSON($('.view-container2'));
      // console.log('testHtml', testHtml);
      //
      // console.log('OK: ', toDOM(toJSON($('.view-container2')[0])));
      // console.log('testJson: ', toJSON($('.view-container2')[0]));
      // console.log('testHtml: ', testHtml);

      // $('body').append(testHtml);
// ===========================
  }
}));
