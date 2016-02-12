'use strict';

class AboutController {

  constructor($http) {
    var about = this;

    about.$http = $http;
    about.awesomeThings = [];

    $http.get('/api/things').then(response => {
      about.awesomeThings = response.data;
    });
  }
}

angular.module('meanApp')
  .controller('AboutController', AboutController);
