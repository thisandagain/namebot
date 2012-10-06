## Namebot
#### A robot that streams name combinations for you. Beep <buzz> ... *ding*!

[![Build Status](https://secure.travis-ci.org/thisandagain/namebot.png)](http://travis-ci.org/thisandagain/namebot)

### Install
```bash
npm install namebot
```

### Usage
```javascript
var Namebot = require('namebot');

var stream = new Namebot({
    base: ['cuttlefish', 'shrew']
    count: 100
});

stream.pipe(process.stdout);
stream.start();
````

### Binary Use
```bash
[sudo] npm install -g namebot
namebot --base "['mega', 'shark', 'giant', 'octopus']" --count 25
```

### Options
#### Base
An array of words that form the basis for names. All names generated will include a word from this object. Can be specified as a local path or as a HTTP GET request to a JSON resource by passing along a URL string.

#### Dictionary (Optional)
Local path to a phonetic dictionary (see [CMUdict](http://www.speech.cs.cmu.edu/cgi-bin/cmudict) for reference).

#### Count (Optional)
Number of names that will be generated. Will default to one (1) if not set.

---

## Testing
```bash
npm test
```

## Credits
The rhyming method for namebot was derived from [James Halliday's](http://substack.net/) [node-rhyme](https://github.com/substack/node-rhyme) module.