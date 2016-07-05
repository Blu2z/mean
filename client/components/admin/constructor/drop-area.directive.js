'use strict';

angular.module('meanApp')
  .directive('ngDroparea', ($document, $compile, $rootScope, $state) => ({
    link: function (scope, element, attr) {

      var boxs = $(element).find('.testing-box');
      var drag = 0;
      var testbox, insertElement;

      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        console.log('stateChange');

        $document.off('dragOn');
      });

      $document.mousemove(e => {
        if (!drag) return;

        var box = $(e.toElement);

        console.log('box: ', box);

        $(e.toElement).addClass('hover');


        console.log('event: ', e)
      });

      $document.on('dragOn', (e, obj) => {
        testbox = 0;
        drag = 1;
        insertElement = obj;
        console.log('insertElement: ', insertElement);
      });

      $(boxs).each(function (ind, el) {
        // console.log($(el));

        // $(el).context.ondragenter = function(e) {
        //   if(drag) { $(el).addClass('hover');}
        // };

        $(el).context.onmouseenter = function(e) {
          if(drag) { $(el).addClass('hover');}
          console.log('onmouseenter', e);
        }

        $(el).context.onmouseup = function(e) {
          if (drag) {
            var elem = angular.element(`\<${insertElement}\>\</${insertElement}\>`)

            $(el).append(elem);

            $compile(elem)(scope);
          }
          // console.log('onmouseup', insertElement);
        }

        $(el).context.onmouseleave = function(e) {
          if(drag) { $(el).removeClass('hover'); }
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
      function toJSON(node) {
        node = node || this;
        var obj = {
          nodeType: node.nodeType
        };
        if (node.tagName) {
          obj.tagName = node.tagName.toLowerCase();
        } else
        if (node.nodeName) {
          obj.nodeName = node.nodeName;
        }
        if (node.nodeValue) {
          obj.nodeValue = node.nodeValue;
        }
        var attrs = node.attributes;
        if (attrs) {
          var length = attrs.length;
          var arr = obj.attributes = new Array(length);
          for (var i = 0; i < length; i++) {
            attr = attrs[i];
            arr[i] = [attr.nodeName, attr.nodeValue];
          }
        }
        var childNodes = node.childNodes;
        if (childNodes) {
          length = childNodes.length;
          arr = obj.childNodes = new Array(length);
          for (i = 0; i < length; i++) {
            arr[i] = toJSON(childNodes[i]);
          }
        }
        return obj;
      }
      console.log(document.getElementsByTagName('body'));
      console.log(toJSON($('.view-container2')[0]));


      function toDOM(obj) {
        if (typeof obj == 'string') {
          obj = JSON.parse(obj);
        }
        var node, nodeType = obj.nodeType;
        switch (nodeType) {
          case 1: //ELEMENT_NODE
            node = document.createElement(obj.tagName);
            var attributes = obj.attributes || [];
            for (var i = 0, len = attributes.length; i < len; i++) {
              var attr = attributes[i];
              node.setAttribute(attr[0], attr[1]);
            }
            break;
          case 3: //TEXT_NODE
            node = document.createTextNode(obj.nodeValue);
            break;
          case 8: //COMMENT_NODE
            node = document.createComment(obj.nodeValue);
            break;
          case 9: //DOCUMENT_NODE
            node = document.implementation.createDocument();
            break;
          case 10: //DOCUMENT_TYPE_NODE
            node = document.implementation.createDocumentType(obj.nodeName);
            break;
          case 11: //DOCUMENT_FRAGMENT_NODE
            node = document.createDocumentFragment();
            break;
          default:
            return node;
        }
        if (nodeType == 1 || nodeType == 11) {
          var childNodes = obj.childNodes || [];
          for (i = 0, len = childNodes.length; i < len; i++) {
            node.appendChild(toDOM(childNodes[i]));
          }
        }
        return node;
      }

      function toTree(obj) {
        if (typeof obj == 'string') {
          obj = JSON.parse(obj);
        }
        var node, nodeType = obj.nodeType;
        switch (nodeType) {
          case 1: //ELEMENT_NODE
            node = document.createElement(obj.tagName);
            var attributes = obj.attributes || [];
            for (var i = 0, len = attributes.length; i < len; i++) {
              var attr = attributes[i];
              node.setAttribute('data-name', attr[1]);
            }
            break;
          case 3: //TEXT_NODE
            node = document.createTextNode(obj.nodeValue);
            console.log('cade3: ', node);
            break;
          case 8: //COMMENT_NODE
            node = document.createComment(obj.nodeValue);
            break;
          case 9: //DOCUMENT_NODE
            node = document.implementation.createDocument();
            break;
          case 10: //DOCUMENT_TYPE_NODE
            node = document.implementation.createDocumentType(obj.nodeName);
            break;
          case 11: //DOCUMENT_FRAGMENT_NODE
            node = document.createDocumentFragment();
            break;
          default:
            return node;
        }
        console.log('nodeType: ', nodeType);
        if (nodeType == 1 || nodeType == 11) {
          // console.log('if', node);
          var childNodes = obj.childNodes || [];
          for (i = 0, len = childNodes.length; i < len; i++) {
            console.log('node', node, childNodes[i]);
            node.appendChild(toTree(childNodes[i]));
          }
        }
        return node;
      }

      var testHtml = toTree(toJSON($('.view-container2')[0]));
      console.log('testHtml: ', testHtml);

      // $('body').append(testHtml);
// ===========================
  }
}));
