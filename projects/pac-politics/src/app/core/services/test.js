// main app
const workerFarm = require("worker-farm");
const service = workerFarm(require.resolve("./script"));

service("hello", function(err, output) {
  console.log(output);
});

// script.js
// This will run in forked processes
module.exports = (input, callback) => {
  callback(null, input + " " + world);
};
