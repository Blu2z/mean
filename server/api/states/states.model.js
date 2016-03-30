'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var StateSchema = new mongoose.Schema({
	name: String,
  url: String,
	parent : String,
	abstract: Boolean,
	templateUrl: String,
	controller: String,
	controllerAs: String
});

export default mongoose.model('State', StateSchema);
