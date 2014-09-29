'use strict';

var artworks = require('../controllers/artworks');

// Artwork authorization helpers
var hasAuthorization = function (req, res, next) {
    if (!req.user.isAdmin && req.artwork.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function (Artworks, app, auth) {

    app.route('/artworks')
        .get(artworks.all)
        .post(auth.requiresLogin, artworks.create);
    app.route('/artworks/:artworkId')
        .get(artworks.show)
        .put(auth.requiresLogin, hasAuthorization, artworks.update)
        .delete(auth.requiresLogin, hasAuthorization, artworks.destroy);
    app.route('/artworks/photos')
        .get(artworks.all)
        .post(auth.requiresLogin, artworks.create);
    // Finish with setting up the artworkId param
    app.param('artworkId', artworks.artwork);
};
