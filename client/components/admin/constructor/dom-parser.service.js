/**
 *  * Created by Blu2z on 06.07.2016.
 */

'use strict';

class DomParserService {

  constructor() {
    var vm = this;

    function DOMtoJSON(node) {
      node = node || this;

      var obj = {
        nodeType: node.nodeType
      };

      // console.log(obj.nodeType);

      if (node.tagName) {
        obj.tagName = node.tagName.toLowerCase();
      } else {
        if (node.nodeName) {
          obj.nodeName = node.nodeName;
        }
        if (node.nodeValue) {
          obj.nodeValue = node.nodeValue;
        }
      }
      var attrs = node.attributes;
      var arr = [];

      if (attrs) {
        var length = attrs.length;
        arr = obj.attributes = new Array(length);

        for (var i = 0; i < length; i++) {
          var attr = attrs[i];
          arr[i] = [attr.nodeName, attr.nodeValue];
        }
      }

      var childNodes = node.childNodes;

      if (childNodes) {
        var length = childNodes.length;
        var arr = obj.childNodes = new Array();

        for (var i = 0, l = 0; i < length; i++) {
          if (childNodes[i].nodeType !== 8) {
            arr.push(DOMtoJSON(childNodes[i]));
          }
        }
      }

      return obj;
    };

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
        for (var i = 0, len = childNodes.length; i < len; i++) {
          node.appendChild(toDOM(childNodes[i]));
        }
      }
      return node;
    };

    function toTree(obj) {
      if (typeof obj == 'string') {
        obj = JSON.parse(obj);
      }
      var node, name = '', nodeType = obj.nodeType;
      switch (nodeType) {
        case 1: //ELEMENT_NODE
          node = document.createElement('div');
          var attributes = obj.attributes || [];
          name = '<' + obj.tagName + '>'
          for (var i = 0, len = attributes.length; i < len; i++) {
            var attr = attributes[i];
            if (attr[0] === 'class') {
              name = '<' + obj.tagName + '>' + attr[1];
              // node.setAttribute('data-name', attr[1]);
              // node.createTextNode(attr[1]);
              // node = document.createTextNode(attr[1]);
            }
          }
          break;
        case 3: //TEXT_NODE
          node = document.createTextNode(obj.nodeValue);
          break;
        case 8: //COMMENT_NODE
          node = document.createTextNode('');
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
        for (i = -1, len = childNodes.length; i < len; i++) {
          if (i === -1) {
            node.appendChild(document.createTextNode(name));
          }else {
            node.appendChild(toTree(childNodes[i]));
          }
        }
      }
      return node;
    };
    
    return {
      DOMtoJSON: DOMtoJSON,
      toDOM: toDOM,
      toTree: toTree
    }
  }
}

angular.module('meanApp')
  .service('DomParserService', DomParserService);

