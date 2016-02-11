'use strict';

class AboutController {

  constructor($http) {
    this.$http = $http;
    this.awesomeThings = [];

    $http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
    });
  }
}

angular.module('meanApp')
  .controller('AboutController', AboutController);
