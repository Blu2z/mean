'use strict';
import passport from 'passport';

var express = require('express');
var controller = require('./app.controller');

var router = express.Router();

router.get('/', isLoggedIn, controller.index);
// router.get('/:id', controller.show);
router.post('/', isLoggedIn, controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

function isLoggedIn(req, res, next) {
	console.log('isLoggedIn:' + req.isAuthenticated());
	if (req.isAuthenticated())
    	return next();
	res.send({'notAdmin': true});
}

module.exports = router;
