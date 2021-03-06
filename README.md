## Namebot
#### A robot that streams name combinations for you. Beep <buzz> ... *ding*!

[![Build Status](https://secure.travis-ci.org/thisandagain/namebot.png)](http://travis-ci.org/thisandagain/namebot)

Namebot is a major component of what we use at [DIY.org](https://diy.org) to generate silly nicknames for kids during [signup](https://diy.org/#join). Combined with a phonetic dictionary, namebot generates unique name combinations based on a specified set of base words. For simplicity, namebot is exposed as a readable stream which can be piped into stdout or a [write stream](http://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options).

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
An array of words that form the basis for names. All names generated will include a word from this object.

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