'use strict';

class AboutController {

  constructor($http, Notification) {
    var about = this;

    about.$http = $http;
    about.awesomeThings = [];
    about.notification = Notification;

    $http.get('/api/things').then(response => {
      about.awesomeThings = response.data;
    });
  }
}

angular.module('meanApp')
  .controller('AboutController', AboutController);
