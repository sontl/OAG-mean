/**
 * Created by sontl on 18/10/14.
 */
'use strict';

/**
 * Module dependency
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Attribute Schema
 */

var AttributeSchema = new Schema({
    type : {
        type : String,
        require: true,
        trim : true
    },
    title : {
        type : String,
        require: true,
        trim : true
    },
    description : {
        type : String
    }
});


/**
 * Validations
 */

AttributeSchema.path('type').validate(function(type) {
    return !!type;
}, 'Type cannot be blank');

AttributeSchema.path('title').validate(function(title) {
    return !!title;
}, 'Title cannot be blank');

mongoose.model('Attribute', AttributeSchema);