'use strict';

(function() {

class MainController {

  constructor($http) {

    this.$http = $http;
    this.awesomeThings = [];
    // this = $scope;

    // ==============

    // ===============
    
    console.debug('MainController is loaded!');


    $http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
    });
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('meanApp')
  .controller('MainController', MainController);

})();

// ==========================

