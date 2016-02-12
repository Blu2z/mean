'use strict';

class NewsController {

  constructor($http, $sce) {
    var news = this;

    news.$http = $http;
    news.awesomeNews = [];

    $http.get('/api/news').then(response => {
      news.awesomeNews = response.data;
    });

    news.trustAsHtml = $sce.trustAsHtml;

  }

  addNews() {
      console.log(this.testNews);
      if (this.testNews) {

        this.$http.post('/api/news', { 
          name: this.testNews.name,
          text: this.testNews.text,
          image: this.testNews.image
        }).success(response => {
          console.debug(response);
          this.awesomeNews.unshift(response);
        });

        this.testNews = '';
      }
    }

  deleteNews(news) {
    this.$http.delete('/api/news/' + news._id);
  }
}

angular.module('meanApp')
  .controller('NewsController', NewsController);
