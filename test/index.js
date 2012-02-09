var vows    = require('vows'),
    assert  = require('assert'),
    namebot = require('../lib/index.js');

/**
 * Setup
 */
var suite       = vows.describe('NameBot');
var base        = ['badger', 'panda'];
var dictionary  = './dict/cmudict.07a.dict';

/**
 * Test
 */
suite.addBatch({

    'Generate name': {

        topic: function() {
            namebot({
                base:           base,
                dictionary:     dictionary,
            }, this.callback);
        },

        'is a string': function (err, obj) {
            console.dir(err);
            console.dir(obj);
            assert.isString(obj);
        },

        'includes two words': function (err, obj) {
            assert.strictEqual(2, obj.split(' ').length);
        },

        'includes a base from corpus': function (err, obj) {
            assert.include(base, obj.split(' ')[0]);
        }

    },

    'Generate name using remote HTTP request corpus': {

        topic: function() {
            namebot({
                base:           base,
                dictionary:     dictionary,
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

})

/**
 * Export
 */
.export(module);