'use strict';

class NewsController {

  constructor($http, $sce, Notification) {
    var news = this;

    news.$http = $http;
    news.awesomeNews = [];

    $http.get('/api/news').then(response => {
      news.awesomeNews = response.data;
    });

    news.trustAsHtml = $sce.trustAsHtml;
    news.notification = Notification;

  }

  // addNews() {
  //     console.log(this);
  //     if (this.testNews) {

  //       this.$http.post('/api/news', { 
  //         name: this.testNews.name,
  //         text: this.testNews.text,
  //         image: this.testNews.image

  //       }).success(response => {

  //         this.awesomeNews.unshift(response);
  //         this.notification.success({message: 'Данные успешно добавлены в базу!', delay: 1500});
  //         this.testNews = '';

  //       }).error(response => {

  //         this.notification.error({message: 'Ошибка соединения!', delay: 2500});
  //         this.testNews = '';
          
  //       });

        
  //     }
  //   }

  // deleteNews(news) {
  //   this.$http.delete('/api/news/' + news._id);
  // }
}

angular.module('meanApp')
  .controller('NewsController', NewsController);
