/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
import passport from 'passport';

export default function(app) {


  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/news', require('./api/news'));
  app.use('/api/admin', require('./api/admin'));
  // app.use('/api/admin/*', isLoggedIn, require('./api/news'));

  // app.get('/admin/news', isLoggedIn, function(req, res) {
  //       res.render('profile.ejs', {
  //           user : req.user // get the user out of session and pass to template
  //       });
  //   });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

 // app.route('/admin')
 //  .get(isLoggedIn, (req, res) => {
 //    res.sendFile(path.resolve(app.get('appPath') + '/admin.html'));
 //  });

  // app.post('/login', passport.authenticate('local-login', function(err, user, info) {
  //   return user;
  // })(req, res, next));


  app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {

      if (err) return next(err); 
      if (!user) return res.send({"error": err});

      req.logIn(user, function(err) {

        if (err) { return res.send({"error": err}) }

        return res.send({"isAdmin": true});

      });
    })(req, res, next);
  });


  // app.route('/login')
  // .get((req, res) => {
  //   res.sendFile(path.resolve(app.get('appPath') + '/login.html'));
  // });

  app.route('/singup')
  .get((req, res) => {
    res.sendFile(path.resolve(app.get('appPath') + '/singup.html'));
  });

  app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/admin', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : false // allow flash messages
    }));


  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });

    function isLoggedIn(req, res, next) {
      console.log('isLoggedIn:' + req.isAuthenticated());
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    // res.redirect('/singup');
    res.send({'notAdmin': true});
}

  
}
