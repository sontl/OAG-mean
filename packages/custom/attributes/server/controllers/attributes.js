/**
 * Created by sontl on 18/10/14.
 */

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
 * Create an Attribute
 */
exports.create = function(req, res) {
    var attribute = new Attribute(req.body);
    attribute.save(function(err) {
       if (err) {
           return res.json(500, {
               error : 'Cannot save the attribute'
           })
       }
       res.json(attribute);
    });
}

var types = function(type){
    Attribute.find({type : type}).exec(function(err, attributes) {
        if (err) {
            return res.json(500, {
                error: 'Cannot list the ' + type
            });
        }
        res.json(attributes);
    });
}

exports.all = function(req, res) {
    types();
}

exports.categories = function(req, res) {
    types(type.category);
}

exports.styles = function(req, res) {
    types(type.style);
}

exports.mediums = function(req, res) {
    types(type.medium);
}