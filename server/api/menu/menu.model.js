'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var MenuSchema = new mongoose.Schema({
	'title': String,
	'state': String
});

export default mongoose.model('Menu', MenuSchema);
