// importing packages
const Inquirer = require("inquirer"),
   File = require("fs"),
   Word = require("./word.js"),
   Letter = require("./letter.js"),
   Dictionary = require("./word_lib.js");

const Game = {
   roundCount: 10,
   word: {},
   letters: [{}],
   dictionary: {},

   wordDict: [],
   iterator: -1,

   random: () => {
      return Math.floor(Math.random() * 50) + 1;
   },

   makeLetterObj: function() {
      return this.word.letters.map((elem) => {
         return new Letter(elem);
      });
   },

   showLetterObj: function() {
      let tempLetter = "";
      this.letters.forEach((elem) => {
         tempLetter += elem.toHide() + " ";
      });
      return console.log("\n" + tempLetter + "\n");
   },

   roundWon: function() {
      return !!Object.getOwnPropertyNames(this.word.unguessed).length;
   },

   shuffle: function(targetArray) {
      const swap = (targetArray, m, i) => {
         let temp = targetArray[i];
         targetArray[i] = targetArray[m];
         targetArray[m] = temp;
      };

      let i, m = targetArray.length;
      while (m) {
         i = Math.floor(Math.random() * m--);
         swap(targetArray, i, m);
      }
      return targetArray;
   },

   GameInit: function() {
      console.log("Hello, welcome to a game of hangman, the theme for today is the top 1000 most popular movie of all time.");
      console.log("Well, have fun!!");
      this.dictionary = new Dictionary(require("./key.js"));
      this.dictionary.downloadLib(this.random());
      File.readFile("./dictionary.txt", "utf8", (err, data) => {
         this.wordDict = JSON.parse(data);
         this.shuffle(this.wordDict);
         this.GameSet();
      });
   },

   // change to GameSet when done with init
   GameSet: function() {
      // reset basic game values
      this.roundCount = 10;
      ++this.iterator;
      // initializing Word object
      this.word = new Word(this.wordDict[this.iterator]);
      this.word.splitWordtoArr();
      this.word.createLookUp();

      // initializing Game object
      this.letters = this.makeLetterObj();

      this.showLetterObj();
      this.GameStart();
   },

   GameStart: function(count = 0) {
      this.roundCount += count;

      if (!this.roundWon()) {
         console.log("Doing great! Time for another word.");
         return this.GameSet();
      }

      if (this.roundCount <= 0) {
         console.log("So close...");
         console.log("The correct answer is %s", this.word.name);
         return this.GameEnd();
      }

      console.log("Remaining guesses: %i", this.roundCount);
      Inquirer.prompt([{
         type: "input",
         message: "Guess a letter in word:",
         name: "usr_guess",
         filter: (value) => {
            return value.toLowerCase();
         }
      }]).then((data) => {
         let guessed = 0,
            remainLetters = "";
         this.letters.forEach((elem) => {
            data.usr_guess !== elem.name.toLowerCase() &&
               (remainLetters += elem.toHide() + " ");
            data.usr_guess === elem.name.toLowerCase() &&
               (remainLetters += elem.toShow() + " ") &&
               ++guessed &&
               delete this.word.unguessed[elem.name];
         });

         console.log("\n" + remainLetters + "\n");
         ++this.iterator;
         return !!guessed ? this.GameStart() : this.GameStart(-1);
      });
   },

   GameEnd: function() {
      Inquirer.prompt([{
         type: "confirm",
         message: "Would you like to restart a game Y/N ?",
         name: "confirm_restart"
      }]).then((data) => {
         if (data.confirm_restart) {
            return this.GameSet();
         }
         return console.log("Okay, see you next time.");
      });
   }
};

Game.GameInit();