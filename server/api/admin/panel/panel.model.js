'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var PanelSchema = new mongoose.Schema({
	'title': String,
	'state': String
});

export default mongoose.model('Panel', PanelSchema);
