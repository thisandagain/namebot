# Namebot
#### A robot that spits out name combinations for you. Beep <buzz> ... *ding*!

## Install
	npm install namebot

## Basic Use
```javascript
var namebot = require('namebot');

namebot({
	base: 			['badger', 'panda'],
	dictionary: 	'./path/to/dictionary.dict',
}, function (err, a) {
	console.log(a);  			// Win!
});
````

## Less Basic Use
```javascript
var namebot = require('namebot');

namebot({
	base: 			'http://domain.com/path/to/base.json',
	dictionary: 	'https://cmusphinx.svn.sourceforge.net/svnroot/cmusphinx/trunk/cmudict/cmudict.0.7a',
	method: 		['rhyme'],
	count: 			10
}, function (err, a) {
	console.log(a);  			// Win!
});
````

## Options
#### Base
An array of words that form the basis for names. All names generated will include a word from this object. Can be specified as a local path or as a HTTP GET request to a JSON resource by passing along a URL.

#### Dictionary
An array of words that form the rhyming library for names. Can be specified as a local path or as a HTTP GET request to a JSON resource by passing along a URL.

#### Method (Optional)
An array of naming methods that will be used by the generator. Will default to use all available options if not set. Currently only supports two options:
- Rhyme
- Random

#### Count (Optional)
Number of names that will be generated. Will default to one (1) if not set.

## Credits
The rhyming method for namebot was heavily influenced by [James Halliday's](http://substack.net/) [node-rhyme](https://github.com/substack/node-rhyme) module.

## Testing
	npm test