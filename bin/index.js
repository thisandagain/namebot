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
var fs 		= require('fs'),
	namebot = require('../lib/index');

var argv 	= require('optimist')
		.demand(['base'])
		.default('dictionary', './dict/cmudict.07a.dict')
		.default('method', '["rhyme", "random"]')
		.default('count', 1)
		.argv;

/**
 * Init
 */
namebot({
	base:  			eval(argv.base),
	dictionary: 	argv.dictionary,
	method: 		eval(argv.method),
	count: 			argv.count
}, function (err, a) {
	if (err) console.log(err);

	console.dir(a);
	/*
	var pretty 	= JSON.stringify(a, null, 4);
	var fsw 	= './names.json';

	fs.writeFile(fsw, pretty, function (err) {
	  	if (err) throw err;

	  	console.log(pretty);
	  	console.log('####')
	  	console.log('JSON saved! ' + fsw);
	  	console.log(' ');
	});
	*/
});