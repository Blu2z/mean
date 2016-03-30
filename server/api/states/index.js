'use strict';
import passport from 'passport';

var express = require('express');
var controller = require('./states.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', isLoggedIn, controller.create);
router.put('/:id', isLoggedIn, controller.update);
router.patch('/:id', isLoggedIn, controller.update);
router.delete('/:id', isLoggedIn, controller.destroy);

function isLoggedIn(req, res, next) {
	console.log('isLoggedIn:' + req.isAuthenticated());
	if (req.isAuthenticated())
		return next();
	res.send({'notAdmin': true});
}

module.exports = router;
