'use strict';

class AdminNewsController {

  constructor($http, $sce, Notification, $state) {
    var news = this;

    news.$http = $http;
    news.awesomeNews = [];
    news.$state = $state;

    news.getData = function () {
      $http.get('/api/news').then(response => {
        news.awesomeNews = response.data;
        console.debug(response.data);
      });
    }

    news.trustAsHtml = $sce.trustAsHtml;
    news.notification = Notification;

    news.getData();
  }

  addNews() {
      console.log(this);
      if (this.testNews) {

        this.$http.post('/api/news', { 
          name: this.testNews.name,
          text: this.testNews.text,
          image: this.testNews.image

        }).success(response => {
          console.debug(response);
          if(response.notAdmin) {
            console.debug('isAdmin');
            this.$state.go('login');
          } else {
            this.awesomeNews.unshift(response);
            this.notification.success({message: 'Данные успешно добавлены в базу!', delay: 1500});
            this.testNews = '';
          }
        }).error(response => {

          this.notification.error({message: 'Ошибка соединения!', delay: 2500});
          this.testNews = '';
          
        });

        
      }
    }

  deleteNews(id) {
    this.$http.delete('/api/news/' + id)
      .success(response => {
        if(response.notAdmin) {
          this.notification.error({message: 'Необходима авторизация!', delay: 2500});
          this.$state.go('login');
        } else {
          this.notification.success({message: 'Данные успешно удалены из базы!', delay: 1500});
          this.getData();
        }
      })
      .error(response => {
          this.notification.error({message: response.message ? response.message : 'Ошибка соединения!', delay: 2500});      
        });
  }
}

angular.module('meanApp')
  .controller('AdminNewsController', AdminNewsController);
