'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Artwork = mongoose.model('Artwork');

/**
 * Globals
 */
var user;
var artwork;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Artwork:', function() {
    beforeEach(function(done) {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        artwork = new Artwork({
          title: 'Artwork Title',
          content: 'Artwork Content',
          user: user
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return artwork.save(function(err) {
          should.not.exist(err);
          artwork.title.should.equal('Artwork Title');
          artwork.content.should.equal('Artwork Content');
          artwork.user.should.not.have.length(0);
          artwork.created.should.not.have.length(0);
          done();
        });
      });

      it('should be able to show an error when try to save without title', function(done) {
        artwork.title = '';

        return artwork.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without content', function(done) {
        artwork.content = '';

        return artwork.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        artwork.user = {};

        return artwork.save(function(err) {
          should.exist(err);
          done();
        });
      });

    });

    afterEach(function(done) {
      artwork.remove();
      user.remove();
      done();
    });
  });
});
