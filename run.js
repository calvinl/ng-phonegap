var asyncblock = require('asyncblock')
  , exec = require('child_process').exec
  , args = process.argv.splice(2)
  , command = args[0];

if (command) {

  var path = args[1];
  if (!path) {
    console.log("Please specify a directory.");
    process.exit(1);
  }

  var p = exec("grunt scaffold:" + path);
  p.stdout.on('data', function(data) {
    console.log('' + data);
  });

} else {
  console.log("Please specify a command.");
  process.exit(1);
}
