'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ThingSchema = new mongoose.Schema({
  name: String,
  text: String,
  image: String,
  active: Boolean
});

export default mongoose.model('News', ThingSchema);
