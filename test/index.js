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

    'Generic': {

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

    'Using only the random method': {

        topic: function() {
            namebot({
                base:           base,
                dictionary:     dictionary,
                method:         ['random'],
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