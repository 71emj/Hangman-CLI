// the word will process validation
// by passing specific value when match special characters, such as , . \s etc...

const Letter = require("./letter.js");

class Word {
   constructor(name) {
      this.name = name;
      this.unguessed = {};
   }
}

// Word.prototype.consoleMyWord = function() {
//    return console.log(this.name.toUpperCase());
// }

Word.prototype.splitWordtoArr = function() {
	this.letters = this.name.split("");
}

Word.prototype.createLookUp = function() {
	this.letters.forEach((elem) => {
		this.unguessed[elem] = true;
	})
}

module.exports = Word;