const OBJ = require("./test_recursive_promise.js");

// OBJ.myFunc().then((msg) => {
// 	console.log(msg);
// });

OBJ.downloadLib(1).then((msg) => {
	console.log(msg);
});