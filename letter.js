// letter object creates letters with accordingly
// when match specific value is matched, tranform object into something else

class Letter {
   constructor(name) {
      this.name = name;
   }

   toHide() {
      return "_";
   }

   toShow() {
   	this.toHide = () => { return this.name };
      return this.name;
   }
}

module.exports = Letter;