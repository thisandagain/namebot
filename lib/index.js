/**
 * NameBot - Beep boop *buzz* ... *ding* >> Name!
 *
 * @package  namebot
 * @author  Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var async       = require('async'),
    fs          = require('fs'),
    request     = require('request');

/**
 * Export
 */
module.exports  = function (options, callback) {

    var valid_methods = [];

    /*
    var ryhme = function (word, dict) {
        word = word.toUpperCase();
        if (!dict[word]) return [];
        
        var xs = dict[word].reduce(function (acc, w) {
            acc[active(w)] = true;
            return acc;
        }, {});
        
        var rhymes = [];
        Object.keys(dict).forEach(function (w) {
            if (w === word) return;
            
            var some = dict[w].some(function (p) {
                return xs[active(p)];
            });
            if (some) rhymes.push(w);
        }, []);

        //return rhymes;
        return 'tommy twotone';
    };

    var random = function (dict) {
        return 'bubba gump';
    };
    */

    var generate = function () {
          
    };

    var util_rand = function (from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    };

    // ---------------------

    async.auto({

        // Parse options
        base:       function (callback) {
            var val = options.base;

            switch (typeof val) {
                case 'string':
                    if (val.indexOf('http') === 0) {
                        request(val, function (err, response, body) {
                            callback(err, body); 
                        });
                    } else {
                        fs.readFile(val, function (err, data) {                            
                            callback(err, data);
                        });
                    }
                    break;
                case 'object':
                    callback(null, val);
                    break;
                default:
                    callback('Invalid "base" parameter.');
                    break;
            }
        },

        dict:       function (callback) {
            var val = options.dictionary;

            if (typeof val === 'string') {
                if (val.indexOf('http') === 0) {
                    request(val, function (err, response, body) {
                        callback(err, body); 
                    });
                } else {
                    fs.readFile(val, function (err, data) {
                        callback(err, data);
                    });
                }
            } else {
                callback('Invalid "dictionary" parameter.');
            }
        },

        method:     function (callback) {
            var val = options.method;

            if (typeof val === 'undefined') {
                callback(null, valid);
            } else if (typeof val === 'object' && Object.prototype.toString.call(val) === '[object Array]') {
                callback(null, val);
            } else {
                callback('Invalid "method" parameter.');
            }
        },

        count:      function (callback) {
            var val = options.count;

            if (typeof val === 'undefined') {
                callback(null, 1);
            } else if (typeof val === 'number') {
                callback(null, val);   
            } else {
                callback('Invalid "count" parameter.');
            }
        },

        // Apply generation algorithm(s)
        generate:   ['base', 'dict', 'method', 'count', function (callback, results) {
            
            
            /*
            var r1 = util_rand(0, results.method.length - 1);
            var r2 = util_rand(0, results.base.length - 1);

            switch (results.method[r1]) {
                case 'random':
                    callback(null, );
                case 'rhyme':
                    callback(null, );
                default:
                    break;
            }
            callback();
            */

            callback();
        }],

        // Format results
        format:     ['generate', function (callback, results) {
            callback(null, 'pandz package');
        }]
        
    }, function (err, a) {
        return callback(err, a.format);
    });

};