/**
 * Created by sontl on 18/10/14.
 */
'use strict';
/*
    Module Dependencies
 */

var mongoose = require('mongoose'),
    Attribute = mongoose.model('Attribute'),
    _ = require('lodash');

var type = {
    category: "category",
    style: "style",
    subject: "subject",
    medium: "medium"
};
/**
 * Find Attribute by id
 */
exports.attribute = function(req, res, next, id) {
    Attribute.load(id, function(err, attribute) {
        if (err) return next(err);
        if (!attribute) return next(new Error('Failed to load attribute ' + id));
        req.attribute = attribute;
        next();
    });
}


/**
 * Update an attribute
 */
exports.update = function(req, res) {
    var attribute = req.attribute;

    attribute = _.extend(attribute, req.body);

    attribute.save(function(err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot update the attribute'
            });
        }
        res.json(attribute);

    });
};

/**
 * Delete an attribute
 */
exports.destroy = function(req, res) {
    var attribute = req.attribute;

    attribute.remove(function(err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot delete the attribute'
            });
        }
        res.json(attribute);

    });
};

/**
 * Show an attribute
 */
exports.show = function(req, res) {
    res.json(req.attribute);
};


/**
 * Create an Attribute
 */
exports.create = function(req, res) {
    var attribute = new Attribute(req.body);
    attribute.type = attribute.type.toUpperCase();
    attribute.save(function(err) {
       if (err) {
           return res.json(500, {
               error : 'Cannot save the attribute'
           })
       }
       res.json(attribute);
    });
}

var types = function(type, req, res){
    var query = {};
    if (type) {
        query = {type : type};
    }
    Attribute.find(query).exec(function(err, attributes) {
        if (err) {
            return res.json(500, {
                error: 'Cannot list the ' + type
            });
        }
        res.json(attributes);
    });
}

exports.all = function(req, res) {
    types(null, req, res);
}

exports.categories = function(req, res) {
    types(type.category.toUpperCase(), req, res);
}

exports.styles = function(req, res) {
    types(type.style.toUpperCase(), req, res);
}

exports.mediums = function(req, res) {
    types(type.medium.toUpperCase(), req, res);
}