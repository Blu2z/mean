'use strict';
import passport from 'passport';

var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', isLoggedIn, controller.create);
router.put('/:id', isLoggedIn, controller.update);
router.patch('/:id', isLoggedIn, controller.update);
router.delete('/:id', isLoggedIn, controller.destroy);

function isLoggedIn(req, res, next) {
  console.log('isLoggedIn:' + req.isAuthenticated());
// if user is authenticated in the session, carry on 
if (req.isAuthenticated())
    return next();

// if they aren't redirect them to the home page
// res.redirect('/singup');
res.send({'isAdmin': false});
}

module.exports = router;
