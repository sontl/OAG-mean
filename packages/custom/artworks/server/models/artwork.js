'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Artwork Schema
 */
var ArtworkSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    styles: {
        type: [],
        ref: String
    },
    category: {
        type: Schema.ObjectId,
        ref: 'Attribute'
    },
    subject: {
        type: Schema.ObjectId,
        ref: 'Attribute'
    },
    isMixedMedia: {
        type: Boolean
    },
    mediums: {
        type: [],
        ref: String
    },
    materials: {
        type: [],
        ref: String
    },
    dimensions: {
        type: Object
    },
    keywords: {
        type: [],
        ref: String
    },
    isForSell: {
        type: Boolean
    },
    price : {
        type: Number
    },
    isFraming: {
        type: Boolean
    },
    dateCreated: {
        type: Date
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    photos: [{ type: Schema.ObjectId, ref: 'Photo' }]
});
//
//
//styles: $scope.styleTags,
//    materials: $scope.materialTags,
//    subject: this.selectedSubject,
//    category: this.selectedCategory,
//    dateCreated : this.dateCreated,
//    price: this.price,
//    profit: this.profit,
//    dimensions: this.dimensions,
//    description: this.description,
//    isMixedMedia: this.isMixedMedia,
//    mediums: this.mediums,
//    keywords: this.keywords,
//    isCopyright: this.isCopyright,
//    isForSell: this.isForSell,
//    isFraming: this.isFraming
/**
 * Validations
 */
ArtworkSchema.path('title').validate(function (title) {
    return !!title;
}, 'Title cannot be blank');

ArtworkSchema.path('description').validate(function (description) {
    return !!description;
}, 'Description cannot be blank');

/**
 * Statics
 */
ArtworkSchema.statics.load = function (id, cb) {
    var populateQuery = [{path:'user', select:'name username'}, {path:'category', select:'title'}
        , {path:'photos', select:'_id'}];

    this.findOne({
        _id: id
    }).populate(populateQuery).exec(cb);
};

mongoose.model('Artwork', ArtworkSchema);
