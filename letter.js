// letter object creates letters with accordingly
// when match specific value is matched, tranform object into something else
class Letter {
   constructor(name) {
      this.name = name;
   }

   toHide() {
   	if (this.name.length > 1) {
   		return " ";
   	}
      return "_";
   }

   toShow() {
   	if (this.name === "SPACE") {
   		return " ";
   	}
   	this.toHide = () => { return this.name };
      return this.name;
   }
}

module.exports = Letter;