'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var AppSchema = new mongoose.Schema({
  mainLayout: Object,
  pages: Array,
  menu: Object
});

export default mongoose.model('App', AppSchema);
