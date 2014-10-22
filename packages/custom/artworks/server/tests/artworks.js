'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Artwork = mongoose.model('Artwork'),
    Attribute = mongoose.model('Attribute');
/**
 * Globals
 */
var user;
var artwork;
var category;
/**
 * Test Suites
 */
describe('<Unit Test>', function () {
    describe('Model Artwork:', function () {
        beforeEach(function (done) {
            category = new Attribute ({
                "description": "this is photography category",
                "type": "CATEGORY",
                "title": "Photography",
                "_id": "5443a18b2931605017ca201b"
            });

            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function () {
                artwork = new Artwork({
                    title: 'Artwork Title',
                    user: user,

                    description: 'Artwork Description'
                });

                done();
            });
        });

        describe('Method Save', function () {
            it('should be able to save without problems', function (done) {
                artwork.category = category;
                return artwork.save(function (err) {
                    should.not.exist(err);
                    console.log('artwork title: ', artwork.title);
                    artwork.title.should.equal('Artwork Title');
                    artwork.description.should.equal('Artwork Description');
                    artwork.user.should.not.have.length(0);
                    artwork.category.should.not.have.length(0);
                    console.log(artwork.category);
                    artwork.created.should.not.have.length(0);
                    done();
                });
            });

            it('should be able to show an error when try to save without title', function (done) {
                artwork.title = '';

                return artwork.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without description', function (done) {
                artwork.description = '';

                return artwork.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without user', function (done) {
                artwork.user = {};

                return artwork.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

        });

        afterEach(function (done) {
            artwork.remove();
            user.remove();
            done();
        });
    });
});
