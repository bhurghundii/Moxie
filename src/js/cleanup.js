//testing clean up procedure for linux
function confirmExit() {
  var util = require('util'),
  exec = require('child_process').exec, child;

  child = exec("fuser -k 11009/tcp", // command line argument directly in string
    function(error, stdout, stderr) { // one easy function to capture data/errors
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });

    var fs = require('fs');
    var data = fs.readFileSync('torchat/Tor/tor.pid');
    pid = data.toString();

    child = exec("kill -9 " + pid, // command line argument directly in string
      function(error, stdout, stderr) { // one easy function to capture data/errors
        if (error !== null) {
          console.log('exec error: ' + error);
        }
      });

}
