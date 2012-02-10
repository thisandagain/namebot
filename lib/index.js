/**
 * NameBot - Beep boop *buzz* ... *ding* >> Name(s)!
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

    var valid_methods = ['random', 'rhyme'];

    /**
     * Returns a random number within a specified range.
     */
    var util_rand = function (from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    };

    /**
     * Slices off leading consonants & returns active rhyming region.
     * @note  From node-rhyme by @substack
     */
    var util_active = function (ws) {
        for (
            var i = 0;
            i < ws.length && ws[i].match(/^[^AEIOU]/i);
            i++
        );
        return ws.slice(i).join(' ');
    };

    /**
     * Compresses (clean-up) and returns an array of items from .dict file
     */
    var util_dict = function (data, callback) {
        var dict = {};
        var lines = data.toString().split('\n');

        var compress = function (line, callback) {
            if (line.match(/^[A-Z]/i)) return callback(true);

            return callback(false);
        }

        var processor = function (line, callback) {
            var words = line.split(/\s+/);
            var w = words[0].replace(/\(\d+\)$/, '');

            if (!dict[w]) dict[w] = [];
            dict[w].push(util_active(words.slice(1)));

            return callback(null);
        };

        // Compress (filter) & Process (map)
        async.filter(lines, compress, function (a) {
            async.forEach(a, processor, function (err) {
                callback(err, dict);
            });
        });
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

            if (typeof val === 'undefined') {
                val = './dict/cmudict.07a.dict';
            }

            if (typeof val === 'string') {
                if (val.indexOf('http') === 0) {
                    request(val, function (err, response, body) {
                        if (err) callback(err);

                        util_dict(body, function (err, a) {
                            callback(err, a);
                        });
                    });
                } else {
                    fs.readFile(val, function (err, data) {
                        if (err) callback(err);

                        util_dict(data, function (err, a) {
                            callback(err, a);
                        });
                    });
                }
            } else {
                callback('Invalid "dictionary" parameter.');
            }
        },

        method:     function (callback) {
            var val = options.method;

            if (typeof val === 'undefined') {
                callback(null, valid_methods);
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
            // Method storage
            var a = [];

            for (var i = 0; i < results.count; i++) {
                a.push(results.method[util_rand(0, results.method.length - 1)]);
            }

            // Processor
            var processor = function (obj, callback) {
                var safe = function (callback) {
                    var word = results.base[util_rand(0, results.base.length - 1)].toUpperCase();
                    var keys = Object.keys(results.dict);
                    var pair = keys[util_rand(0, keys.length - 1)];

                    callback(null, word + ' ' + pair);
                };

                switch (obj) {
                    // Random method
                    case 'random':
                        safe(function (err, a) {
                           callback(err, a); 
                        });
                        break;

                    // Rhyme method
                    case 'rhyme':
                        var word = results.base[util_rand(0, results.base.length - 1)].toUpperCase();
                        if (!results.dict[word]) callback('Could not find a dictionary entry for the base word "' + word + '"');

                        var processor = function (w, callback) {
                            if (w === word) return callback(false);

                            if (results.dict[word].toString() == results.dict[w].toString()) {
                                return callback(true);
                            } else {
                                return callback(false);
                            }
                        };

                        async.filter(Object.keys(results.dict), processor, function (rhymes) {
                            if (rhymes.length === 0) {
                                safe(function (err, a) {
                                   callback(err, a); 
                                });
                            } else {
                                callback(null, word + ' ' + rhymes[util_rand(0, rhymes.length - 1)]);   
                            }
                        });
                        break;
                    
                    // Invalid
                    default:
                        callback('Invalid "method" parameter.');
                }
            };

            // Async map of methods (per count)
            async.map(a, processor, function (err, a) {
                if (a.length === 1) {
                    callback(err, a[0]);
                } else {
                    callback(err, a);
                }
            });
        }],
        
    }, function (err, a) {
        if (err) return callback(err);

        return callback(err, a.generate);
    });

};