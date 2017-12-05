const Request = require("request"),
   File = require("fs");

class Dictionary {
   constructor(apikeys) {
      this.keys = apikeys; // could be object or array if expand lib search
      this.datalog = [];
      this.accessLimit = 0;
   }
}

Dictionary.prototype.downloadLib = function(accesspage) {
   const that = this;
   if (this.accessLimit < 3) {
      Request.get("https://api.themoviedb.org/3/discover/movie?api_key=" + this.keys + "&sort_by=vote_count.desc&page=" + accesspage, function(err, res, data) {
         const datObj = JSON.parse(data);
         datObj.results.forEach((elem) => {
            that.datalog.push(elem.original_title);
         });
         ++that.accessLimit;
         return that.downloadLib(++accesspage);
      });
   } else {
      File.writeFile("./dictionary.txt", JSON.stringify(this.datalog), "utf8", (err) => {
         if (err) {
            return console.log("Something went wrong writing library, game must terminate.");
         }
      });
   }
}

module.exports = Dictionary;