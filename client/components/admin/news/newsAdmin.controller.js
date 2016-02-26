'use strict';

class AdminNewsController {

  constructor($http, $sce, Notification, $state, Modal, $rootScope, AdminService) {
    var news = this;

    news.$http = $http;
    news.awesomeNews = [];
    news.$state = $state;
    news.trustAsHtml = $sce.trustAsHtml;
    news.notification = Notification;
    news.modal = Modal;
    news.adminService = AdminService;

    // console.debug(AdminService.transport); 

    news.getData = function () {
      $http.get('/api/news').then(response => {
        news.awesomeNews = response.data;
        // console.debug(response.data);
      },
      response => {
        this.notification.error({message: 'Ошибка соединения!', delay: 2500});
      });
    }

    news.confirmDelete = function (name, id) {
      if(!$rootScope.askModal) {
        (news.modal.confirm.delete( id => {
          news.deleteNews(id)
        }))(name, id);
      } else {
        news.deleteNews(id);
      }
    } 

    news.getData();
  }

  addNews(args) {
    var obj = {};

    for(var k in args) {
      obj[k] = args[k];
    }

    if (this.testNews) {

      this.$http.post('/api/news', obj)
      .success(response => {
        console.debug(response);
        if(response.notAdmin) {
          // console.debug('isAdmin');
          this.$state.go('login');
        } else {
          this.awesomeNews.unshift(response);
          this.notification.success({message: 'Данные успешно добавлены в базу!', delay: 1500});
          this.testNews = '';
        }
      })
      .error(response => {
        this.notification.error({message: 'Ошибка соединения!', delay: 2500});
        this.testNews = '';
      });
    }
  }

  deleteNews(id) {
    this.adminService.transport( '/api/news/' + id, 'delete', null, () => {
      this.notification.success({message: 'Данные успешно удалены из базы!', delay: 1500});
      this.getData();
    });
  }

  editNews(id) {
    var vm = this;

    this.adminService.transport( '/api/news/' + id, 'get', null, (response) => {
      (this.modal.create.edit(function () {   
          vm.adminService.transport( '/api/news/' + id, 'put', this, (response) => {
          vm.notification.success({message: 'Данные успешно обновлены в базе!', delay: 1500});
          vm.getData();
        });
      }))(response.name, response.text, id);
    });
  }
}

angular.module('meanApp')
  .controller('AdminNewsController', AdminNewsController);
