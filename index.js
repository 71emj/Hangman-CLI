// importing packages
const Inquirer = require("inquirer"),
   Word = require("./word.js"),
   Letter = require("./letter.js");

const Game = {
   roundCount: 5,
   word: {},
   letters: [{}],

   makeWordObj: function() {
      return this.word.letters.map((elem) => {
         return new Letter(elem);
      });
   },

   showLetterObj: function() {
      let tempLetter = "";
      this.letters.forEach((elem) => {
         tempLetter += elem.toHide() + " ";
      });
      return console.log(tempLetter);
   },

   roundWon: function() {
      return !!Object.getOwnPropertyNames(this.word.unguessed).length;
   },

   GameInit: function() {
      Inquirer.prompt([{
         type: "input",
         message: "Give us a word you wish to transform into uppercase",
         name: "usr_input"
      }]).then((data) => {
         // initializing Word object
         this.word = new Word(data.usr_input);
         this.word.splitWordtoArr();
         this.word.createLookUp();
         
         // initializing Game object
         this.letters = this.makeWordObj();

         this.showLetterObj();
         this.GameStart();
      });
   },

   GameStart: function(count = 0) {
      this.roundCount += count;

      if (!this.roundWon()) {
         console.log("Okay you won! Time to start another round");
         return this.GameReset();
      }

      if (this.roundCount <= 0) {
         return console.log("You have no chances left...");
      }

      console.log("Remain guess: %i", this.roundCount);
      Inquirer.prompt([{
         type: "input",
         message: "Guess a letter in word",
         name: "usr_guess",
         filter: (value) => {
            return value.toLowerCase();
         }
      }]).then((data) => {
         let guessed = 0,
            tempLetter = "";
         this.letters.forEach((elem) => {
            data.usr_guess !== elem.name.toLowerCase() && (tempLetter += elem.toHide() + " ");
            data.usr_guess === elem.name.toLowerCase() && (tempLetter += elem.toShow() + " ") && ++guessed && delete this.word.unguessed[elem.name];
         });

         console.log(tempLetter);
         return !!guessed ? this.GameStart() : this.GameStart(-1);
      });
   },

   GameReset: function() {
      this.roundCount = 5;
      this.GameInit();
   }
};


Game.GameInit();