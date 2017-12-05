// letter object creates letters with accordingly
// when match specific value is matched, tranform object into something else
class Letter {
   constructor(name) {
      this.name = name;
   }
}

Letter.prototype.toHide = function() {
   if (this.name.match(/[^a-z]/i)) {
      return this.name;
   }
   return "_";
};

Letter.prototype.toShow = function() {
   if (this.name.match(/[^a-z]/i)) {
      return this.name;
   }
   this.toHide = () => { return this.name };
   return this.name;
};

module.exports = Letter;