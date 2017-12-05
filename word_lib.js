const Request = require("request"),
   Promise = require("bluebird"),
   File = require("fs");

class Dictionary {
   constructor(apikeys) {
      this.keys = apikeys; // could be object or array if expand lib search
      this.datalog = [];
      this.accessLimit = 0;
   }
}

Dictionary.prototype.logDataToFile = function(data) {
   return new Promise((resolve) => {
      File.writeFile("./dictionary.txt", JSON.stringify(data), "utf8", (err) => {
         if (err) {
            return console.log("Something went wrong writing library, game must terminate.");
         }
         resolve();
      })
   });
}

Dictionary.prototype.downloadLib = function(accesspage) {
   // basically everthing in this method needs a proxy
   const that = this;
   return new Promise((resolve) => {
      function recurse(accesspage) {
         Request.get("https://api.themoviedb.org/3/discover/movie?api_key=" + that.keys + "&sort_by=vote_count.desc&page=" + accesspage, function(err, res, data) {
            const datObj = JSON.parse(data);
            datObj.results.forEach((elem) => {
               that.datalog.push(elem.original_title);
            });
            ++that.accessLimit;
            if (that.accessLimit < 3) {
               recurse(++accesspage);
            } else {
               that.logDataToFile(that.datalog).then(() => {
                  resolve("Finally we have a return promise");
               });
            }
         });
      }
      recurse(accesspage);
   });
}

module.exports = Dictionary;