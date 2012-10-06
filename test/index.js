/**
 * Test suite
 *
 * @package namebot
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var async   = require('async'),
    test    = require('tap').test,

    target  = require(__dirname + '/../lib/index.js');

/**
 * Setup
 */
var count   = 10;
var namebot = new target({
    base: ['FOX', 'TURTLE', 'OWL', 'HOOT', 'WISE', 'BISON'],
    count: count
});

/**
 * Suite
 */
async.auto({

    general:  function (callback) {
        var a = [];
        
        namebot.on('data', function (data) {
            a.push(data);
        });

        namebot.on('end', function () {
            callback(null, a);
        });

        namebot.start();
    },

    test:   ['general', function (callback, obj) {
        test('Component definition', function (t) {
            t.type(target, 'function', 'Component should be a function');
            t.end();
        });

        test('General test case', function (t) {
            t.type(obj.general, 'object', 'Results should be an object');
            t.equal(obj.general.length, count, 'Reults should be of expected length');
            t.end();
        });

        callback();
    }]

}, function (err, obj) {
    test('Catch errors', function (t) {
        t.equal(err, null, 'Errors should be null');
        t.end();
    });
});