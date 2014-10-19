'use strict';

var attributes = require('../controllers/attributes');


// The Package is past automatically as first parameter
module.exports = function (Attributes, app, auth, database) {

    app.get('/attributes/example/anyone', function (req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/attributes/example/auth', auth.requiresLogin, function (req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/attributes/example/admin', auth.requiresAdmin, function (req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/attributes/example/render', function (req, res, next) {
        Attributes.render('index', {
            package: 'attributes'
        }, function (err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });

    app.route('/attributes')
        .get(attributes.all)
        .post(attributes.create);
    app.route('/attributes/categories')
        .get(attributes.categories);
    app.route('/attributes/styles')
        .get(attributes.styles);
    app.route('/attributes/mediums')
        .get(attributes.mediums);
    app.route('/attributes/:attributeId')
        .get(attributes.show)
        .put(auth.requiresAdmin, attributes.update)
        .delete(auth.requiresAdmin, attributes.destroy);
    // Finish with setting up the attributeId param
    app.param('attributeId', attributes.attribute);
};
