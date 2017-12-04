// the word will process validation
// by passing specific value when match special characters, such as , . \s etc...
class Word {
   constructor(name) {
      this.name = name;
      this.unguessed = {};
   }
}

Word.prototype.splitWordtoArr = function() {
   this.letters = this.name.split("");
   this.validateAlphabet();
}

Word.prototype.createLookUp = function() {
   this.letters.forEach((elem) => {
      if (elem !== "SPACE") {
      	this.unguessed[elem] = true;
      }
   });
}

Word.prototype.validateAlphabet = function() {
   this.letters.find((elem, index, array) => {
      if (elem.match(/\s/)) {
         array[index] = "SPACE";
      }
   });
}

module.exports = Word;