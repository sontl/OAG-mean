'use strict';

// The Package is past automatically as first parameter
module.exports = function(Artworks, app, auth, database) {

  app.get('/artworks/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/artworks/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/artworks/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/artworks/example/render', function(req, res, next) {
    Artworks.render('index', {
      package: 'artworks'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
