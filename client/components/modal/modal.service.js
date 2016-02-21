'use strict';

angular.module('meanApp')
  .factory('Modal', function($rootScope, $modal) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */

    function openModal(scope = {}, modalClass = 'modal-default', template = 'components/modal/modal.html') {
      var modalScope = $rootScope.$new();
      
      modalScope.check = $rootScope.askModal;

      angular.extend(modalScope, scope);

      return $modal.open({
        templateUrl: template,
        windowClass: modalClass,
        scope: modalScope
      });
    }

    // Public API here
    return {
      create: {

        edit(ed = angular.noop) {

          return function() {
            var args = Array.prototype.slice.call(arguments),
                name = args.shift(),
                text = args.shift(),
                editModal;

            editModal = openModal({
              modal: {
                dismissable: true,
                title: 'Редактировать новость',
                html: '',
                text: text,
                name: name,
                ask: true,
                modalChange: function (check) {
                  $rootScope.askModal = check;
                  console.debug($rootScope.askModal);
                },
                buttons: [{
                  classes: 'btn-success',
                  text: 'Сохранить',
                  click: function(e) {
                    editModal.close(e);
                  }
                }]
              }
            }, 'modal-warning modal-edit', 'components/modal/modal2.html');

            editModal.result.then(function(event) {
              ed.apply(event, args);
            });
          };
        }
      },
      /* Confirmation modals */
      confirm: {

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        delete(del = angular.noop) {
          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed straight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
                name = args.shift(),
                deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm Delete',
                html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
                ask: true,
                modalChange: function (check) {
                  $rootScope.askModal = check;
                  console.debug($rootScope.askModal);
                },
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Delete',
                  click: function(e) {
                    deleteModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    deleteModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            deleteModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        }
      }
    };
  });
