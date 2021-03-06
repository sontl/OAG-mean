'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Artwork = mongoose.model('Artwork'),
    Attribute = mongoose.model('Attribute'),
    Photo = mongoose.model('Photo'),
    _ = require('lodash');


/**
 * Find artwork by id
 */
exports.artwork = function (req, res, next, id) {
    Artwork.load(id, function (err, artwork) {
        if (err) return next(err);
        if (!artwork) return next(new Error('Failed to load artwork ' + id));
        req.artwork = artwork;
        next();
    });
};

/**
 * Create an artwork
 */
exports.create = function (req, res) {
    req.body.category = new Attribute(req.body.category);
    req.body.subject = new Attribute(req.body.subject);
    var reqPhotos = req.body.photos;
    var photos = [];
    for (var i=0; i < reqPhotos.length; i++) {
        var photo = new Photo(reqPhotos[i]);
        photos.push(photo);
    }
    req.body.photos = photos;
    var artwork = new Artwork(req.body);
    artwork.user = req.user;
    artwork.save(function (err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot save the artwork'
            });
        }
        res.json(artwork);

    });
};

/**
 * Update an artwork
 */
exports.update = function (req, res) {
    var artwork = req.artwork;

    artwork = _.extend(artwork, req.body);

    artwork.save(function (err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot update the artwork'
            });
        }
        res.json(artwork);

    });
};

/**
 * Delete an artwork
 */
exports.destroy = function (req, res) {
    var artwork = req.artwork;

    artwork.remove(function (err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot delete the artwork'
            });
        }
        res.json(artwork);

    });
};

/**
 * Show an artwork
 */
exports.show = function (req, res) {
    res.json(req.artwork);
};

/**
 * List of Artworks
 */
exports.all = function (req, res) {
    var populateQuery = [{path:'user', select:'name username'}, {path:'category', select:'title'}
        , {path:'photos', select:'_id'}];

    Artwork.find().sort('-created').populate('user', 'name username').exec(function (err, artworks) {
        if (err) {
            return res.json(500, {
                error: 'Cannot list the artworks'
            });
        }
        res.json(artworks);

    });
};
