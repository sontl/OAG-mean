'use strict';

// The Package is past automatically as first parameter
module.exports = function(Artcollections, app, auth, database) {

  app.get('/artcollections/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/artcollections/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/artcollections/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/artcollections/example/render', function(req, res, next) {
    Artcollections.render('index', {
      package: 'artcollections'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
