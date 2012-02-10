var vows    = require('vows'),
    assert  = require('assert'),
    namebot = require('../lib/index.js');

/**
 * Setup
 */
var suite       = vows.describe('NameBot');
var base        = ['FOX', 'TURTLE', 'OWL', 'HOOT', 'WISE', 'BISON'];
var dictionary  = './dict/cmudict.07a.dict';

/**
 * Test
 */
suite.addBatch({

    'Generic': {

        topic: function() {
            namebot({
                base:           base,
            }, this.callback);
        },

        'is a string': function (err, obj) {
            assert.isString(obj);
        },

        'includes two words': function (err, obj) {
            assert.strictEqual(2, obj.split(' ').length);
        },

        'includes a base from corpus': function (err, obj) {
            assert.include(base, obj.split(' ')[0]);
        }

    },

    'Using only the rhyme method': {

        topic: function() {
            namebot({
                base:           base,
                dictionary:     dictionary,
                method:         ['rhyme'],
            }, this.callback);
        },

        'is a string': function (err, obj) {
            assert.isString(obj);
        },
        
        'includes two words': function (err, obj) {
            assert.strictEqual(2, obj.split(' ').length);
        },

        'includes a base from corpus': function (err, obj) {
            assert.include(base, obj.split(' ')[0]);
        }

    },

    'Using only the rhyme method (x10)': {

        topic: function() {
            namebot({
                base:           base,
                dictionary:     dictionary,
                method:         ['rhyme'],
                count:          10
            }, this.callback);
        },

        'is an array': function (err, obj) {
            assert.isArray(obj);
        },

        'is the proper length': function (err, obj) {
            assert.strictEqual(obj.length, 10);
        },

        'first item is a string': function (err, obj) {
            assert.isString(obj[0]);  
        },
        
        'first item includes two words': function (err, obj) {
            assert.strictEqual(2, obj[0].split(' ').length);
        },

        'first item includes a base from corpus': function (err, obj) {
            assert.include(base, obj[0].split(' ')[0]);
        }

    },

    'Using only the random method (x10)': {

        topic: function() {
            namebot({
                base:           base,
                dictionary:     dictionary,
                method:         ['random'],
                count:          10
            }, this.callback);
        },

        'is an array': function (err, obj) {
            assert.isArray(obj);
        },

        'is the proper length': function (err, obj) {
            assert.strictEqual(obj.length, 10);
        },

        'first item is a string': function (err, obj) {
            assert.isString(obj[0]);  
        },
        
        'first item includes two words': function (err, obj) {
            assert.strictEqual(2, obj[0].split(' ').length);
        },

        'first item includes a base from corpus': function (err, obj) {
            assert.include(base, obj[0].split(' ')[0]);
        }

    },

    'Using only the random method (x10)': {

        topic: function() {
            namebot({
                base:           base,
                dictionary:     dictionary,
                method:         ['random'],
                count:          10
            }, this.callback);
        },

        'is an array': function (err, obj) {
            assert.isArray(obj);
        },

        'is the proper length': function (err, obj) {
            assert.strictEqual(obj.length, 10);
        },

        'first item is a string': function (err, obj) {
            assert.isString(obj[0]);  
        },
        
        'first item includes two words': function (err, obj) {
            assert.strictEqual(2, obj[0].split(' ').length);
        },

        'first item includes a base from corpus': function (err, obj) {
            assert.include(base, obj[0].split(' ')[0]);
        }

    },

})

/**
 * Export
 */
.export(module);