'use strict';

class AboutController {

  constructor($http, Notification) {
    var about = this;

    about.$http = $http;
    about.awesomeThings = [];
    about.notification = Notification;

    $http.get('/api/things').then(response => {
      about.awesomeThings = response.data;
      console.debug(response.data.isAdmin);
      if(!response.data.isAdmin) {
      	about.notification.error({message: 'Необходима авторизация!', delay: 2500});
      };
    });
  }
}

angular.module('meanApp')
  .controller('AboutController', AboutController);
