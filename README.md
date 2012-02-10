# Namebot
#### A robot that spits out name combinations for you. Beep <buzz> ... *ding*!

## Install
	npm install namebot

## Basic Use
```javascript
var namebot = require('namebot');

namebot({
	base: 			['badger', 'panda']
}, function (err, a) {
	console.log(a);  			// Win!
});
````

## Less Basic Use
```javascript
var namebot = require('namebot');

namebot({
	base: 			'http://domain.com/path/to/base.json',
	dictionary: 	'./path/to/dictionary.dict',
	method: 		['rhyme'],
	count: 			10
}, function (err, a) {
	console.dir(a);  			// Win!
});
````

## Binary Use
	npm install -g namebot

	namebot --base "['mega', 'shark', 'giant', 'octopus']" --count 25

## Options
#### Base
An array of words that form the basis for names. All names generated will include a word from this object. Can be specified as a local path or as a HTTP GET request to a JSON resource by passing along a URL string.

#### Dictionary (Optional)
A phonetic dictionary (see [CMUdict](http://www.speech.cs.cmu.edu/cgi-bin/cmudict) for reference). Can be specified as a local path or as a HTTP GET request to a resource by passing along a URL string.

#### Method (Optional)
An array of naming methods that will be used by the generator. Will default to use all available options if not set. Currently only supports two options:
- Rhyme
- Random

*Note: Regardless of the method options, namebot will use the random method to generate a name if a rhyming pair can not be found.

#### Count (Optional)
Number of names that will be generated. Will default to one (1) if not set.

## Credits
The rhyming method for namebot was derived from [James Halliday's](http://substack.net/) [node-rhyme](https://github.com/substack/node-rhyme) module.

## Testing
	npm test