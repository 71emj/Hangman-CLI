var prompt = require('prompt');

var schema = {
    properties: {
        name: {
            description: "Please enter your name",
            pattern: /^[a-zA-Z\s\-]+$/,
            message: 'Name must be only letters, spaces, or dashes',
            required: true
        },
        password: {
          description: "Confirm you password",
          hidden: true,
          replace: "*",
          // message: prompt["name"],
          conform: (value) => {
            return value >= 8;
          }
        }
    }
};

// 
// Start the prompt 
// 
prompt.start();

// 
// Get two properties from the user: email, password 
// 
prompt.get(schema, function(err, result) {
    // 
    // Log the results. 
    // 
    console.log('Command-line input received:');
    console.log('  name: ' + result.name);
    console.log('  password: ' + result.password);
});


// 
// Start the prompt 
// 
// prompt.start();

// // 
// // Get two properties from the user: username and password 
// // 
// prompt.get([{
//     name: 'username',
//     required: true
// }, {
//     name: 'password',
//     hidden: true,
//     conform: function(value) {
//         return true;
//     }
// }], function(err, result) {
//     // 
//     // Log the results. 
//     // 
//     console.log('Command-line input received:');
//     console.log('  username: ' + result.username);
//     console.log('  password: ' + result.password);
// });

// var schema = {
//     properties: {
//         proxy: {
//             description: 'Proxy url',
//         },
//         proxyCredentials: {
//             description: 'Proxy credentials',
//             ask: function() {
//                 // only ask for proxy credentials if a proxy was set 
//                 return prompt.history('proxy').value > 0;
//             }
//         }
//     }
// };

//   // 
//   // Start the prompt 
//   // 
//   prompt.start();

//   // 
//   // Get one or two properties from the user, depending on 
//   // what the user answered for proxy 
//   // 
//   prompt.get(schema, function (err, result) {
//     // 
//     // Log the results. 
//     // 
//     console.log('Command-line input received:');
//     console.log('  proxy: ' + result.proxy);
//     console.log('  credentials: ' + result.proxyCredentials);
//   });