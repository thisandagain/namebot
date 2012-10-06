/**
 * Beep boop *buzz* ... *ding* >> Name(s)!
 *
 * @package namebot
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var _       = require('underscore'),
    async   = require('async'),
    colors  = require('colors'),
    fs      = require('fs'),
    stream  = require('stream'),
    util    = require('util');

/**
 * Basic random range generator.
 *
 * @param {Number} From
 * @param {Number} To
 *
 * @return {Number}
 */
function rand (from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

/**
 * Slices off leading consonants & returns active rhyming region.
 * @note Special thanks to @substack for this from "node-rhyme"
 *
 * @param {String} Word
 *
 * @return {String} Active rhyming region.
 */
function processWord (ws) {
    for (
        var i = 0;
        i < ws.length && ws[i].match(/^[^AEIOU]/i);
        i++
    );
    return ws.slice(i).join(' ');
};

/**
 * Compresses (cleans-up) and returns a hash table from .dict file
 *
 * @param {String} Raw dict file data
 *
 * @return {Object}
 */
function processDictionary (data, callback) {
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
        dict[w].push(processWord(words.slice(1)));

        return callback(null);
    };

    // Compress (filter) & Process (map)
    async.filter(lines, compress, function (a) {
        async.forEach(a, processor, function (err) {
            callback(err, dict);
        });
    });
};

/**
 * Imports dictionary for the specified path.
 *
 * @param {String} Dictionary path
 *
 * @return {Object}
 */
function importDictionary (path, callback) {
    process.stdout.write('Importing dictionary...'.green);
    fs.readFile(path, function (err, data) {
        process.stdout.write(' done.\n'.green);
        if (err) return callback(err);
        processDictionary(data, callback);
    });
}

/**
 * Constructor
 *
 * @param {Object} Constructor arguments
 *              - base {Array, Required} Base words
 *              - count {Number} Number of names to be generated
 *              - dictionary {String} Path to a valid .dict file
 */
function Namebot (args) {
    var self = this;

    // Parse args
    _.defaults(args, {
        base:       [],
        count:      1,
        dictionary: __dirname + '/../dict/cmudict.07a.dict'
    });

    // Validate
    if (args.base.length === 0) throw new Error('Namebot requires at least one base word.');

    // Setup
    self.readable   = true;
    self.target     = Number(args.count);
    self.path       = args.dictionary;

    self.hash       = new Object(null);
    self.dict       = {};
    self.base       = args.base;

    // Generation methods
    self.methods    = [
        // Random
        function (callback) {
            var word = self.base[rand(0, self.base.length - 1)].toUpperCase();
            var keys = Object.keys(self.dict);
            var pair = keys[rand(0, keys.length - 1)];
            
            if (Math.round(Math.random())) return callback(null, pair + ' ' + word);
            callback(null, word + ' ' + pair);
        },

        // Rhyme
        function (callback) {
            var word = self.base[rand(0, self.base.length - 1)].toUpperCase();
            if (!self.dict[word]) callback('Could not find a dictionary entry for the base word "' + word + '"');

            var processor = function (w, callback) {
                if (w === word) return callback(false);

                if (self.dict[word].toString() == self.dict[w].toString()) {
                    return callback(true);
                } else {
                    return callback(false);
                }
            };

            async.filter(Object.keys(self.dict), processor, function (rhymes) {
                if (rhymes.length === 0) return callback('Not Found');
                callback(null, word + ' ' + rhymes[rand(0, rhymes.length - 1)]);   
            });
        }
    ];
};
util.inherits(Namebot, stream);

/**
 * Emits a single name.
 *
 * @return {String}
 */
Namebot.prototype.one = function (callback) {
    var self = this;
    var rand = Math.round(Math.random());
    self.methods[rand](callback);
};

/**
 * Start emitting a stream of unique name combinations.
 *
 * @return {void}
 */
Namebot.prototype.start = function () {
    var self = this;

    // Recurse until desired target has been reached
    function tick () {
        self.one(function (err, obj) {
            if (err) {
                tick();
            } else {
                if (typeof self.hash[obj] === 'undefined') {
                    console.log(obj.grey);
                    self.hash[obj] = 0;
                    self.emit('data', obj + '\n');
                }

                if (Object.keys(self.hash).length >= self.target) {
                    self.emit('end');
                    console.log('Done.'.green);
                } else {
                    tick();
                }
            }
        });
    }

    // Populate dictionary & start
    importDictionary(self.path, function (err, dict) {
        if (err) throw new Error(err);
        self.dict = dict;
        tick();
    });
};

/**
 * Export
 */
module.exports = Namebot;
