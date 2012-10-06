#!/usr/bin/env node

/**
 * NameBot - Beep boop *buzz* ... *ding* >> Name(s)!
 *
 * @package  namebot
 * @author  Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var fs      = require('fs'),
    Namebot = require('../lib/index');

var argv    = require('optimist')
        .demand(['base'])
        .default('dictionary', __dirname + '/../dict/cmudict.07a.dict')
        .default('count', 1)
        .default('name', 'names.txt')
        .argv;

/**
 * Init
 */
var proc = new Namebot({
    base:       eval(argv.base),
    dictionary: argv.dictionary,
    count:      argv.count
});

var filestream = fs.createWriteStream(process.cwd() + '/' + argv.name);

/**
 * Start
 */
proc.pipe(filestream);
proc.start();