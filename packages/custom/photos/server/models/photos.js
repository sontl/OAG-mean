/**
 * Created by sontl on 1/10/14.
 */

/**
 * Module dependencies.
 */
var mongoose = require('mongoose') ;
Schema = mongoose.Schema;


/**
 * Photos Schema
 */
var PhotosSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    path: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});


/**
 * Validations
 */
PhotosSchema.path('path').validate(function(path) {
    return !!path;
}, 'Path cannot be blank');

/**
 * Statics
 */
PhotosSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Photo', PhotosSchema);

