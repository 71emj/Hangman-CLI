const Promise = require("bluebird"),
   Request = require("request"),
   File = require("fs");


let iterator = 0;


const obj = {
   datalog: [],
   myFunc() {
      return new Promise((resolve, reject) => {
         function lalala() {
            console.log("This should return 3 times");
            setTimeout(function() {
               if (iterator < 3) {
                  ++iterator;
                  lalala();
               } else {
                  resolve("Damn right I did it...in a way");
               }
            }, 0)
         }
         lalala();
      })
   }
}



// obj.myFunc().then((msg) => {
//    console.log(msg);
// });
module.exports = obj;

obj.logToFile = function(data) {
   return new Promise((resolve) => {
      File.writeFile("./dictionary.txt", JSON.stringify(data), "utf8", (err) => {
         if (err) {
            return console.log("Something went wrong writing library, game must terminate.");
         }
         resolve();
      })
   });
}

obj.downloadLib = function(accesspage) {
   const that = this;
   return new Promise((resolve) => {
      function recurse(accesspage) {
         Request.get("https://api.themoviedb.org/3/discover/movie?api_key=" + require("./key.js") + "&sort_by=vote_count.desc&page=" + accesspage, function(err, res, data) {
            const datObj = JSON.parse(data);
            datObj.results.forEach((elem) => {
               console.log(elem.original_title);
               that.datalog.push(elem.original_title);
            });
            ++iterator;
            if (iterator < 3) {
               recurse(++accesspage);
            } else {
               that.logToFile(that.datalog).then(() => {
                  resolve("Finally we have a return promise");
               });
            }
         });
      }
      recurse(accesspage);
   });
}



// if (this.accessLimit < 3) {

// } else {
//    File.writeFileSync("./dictionary.txt", JSON.stringify(this.datalog), "utf8", (err) => {
//       if (err) {
//          return console.log("Something went wrong writing library, game must terminate.");
//       }
//    });
// }