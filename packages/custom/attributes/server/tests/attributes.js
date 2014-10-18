/**
 * Created by sontl on 18/10/14.
 */
'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Attribute = mongoose.model('Attribute');

/**
 * Globals
 */
var attribute;
var existingAttributes;
/**
 * Test Suites
 */
describe('<Unit Test>', function() {
    describe('Model Attribute:', function() {
        beforeEach(function(done) {
            //nothing to declare
            attribute = new Attribute({
                title: 'Attribute Title',
                type: 'Category',
                content: 'Attribute Content',
                description : 'Attribute Description'
            });
            done();
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return attribute.save(function(err) {
                    should.not.exist(err);
                    attribute.title.should.equal('Attribute Title');
                    attribute.type.should.equal('Category');
                    attribute.description.should.equal('Attribute Description');
                    done();
                });
            });

            it('should be able to show an error when try to save without title', function(done) {
                attribute.title = '';

                return attribute.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without type', function(done) {
                attribute.type = '';

                return attribute.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        describe('Method Get', function() {
            it('should be able to get all attributes without problems', function(done) {
                attribute.save(function(err) {
                    should.not.exist(err);
                    var type = 'Category';
                    Attribute.find({type : type}).exec(function(err2, attributes) {
                        should.not.exist(err2);
                        console.log("attributes found: ", attributes);
                        done();
                    });
                });
            });
        });

        afterEach(function(done) {
            attribute.remove();
            done();
        });
    });
});
