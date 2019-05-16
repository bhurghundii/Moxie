//testing clean up procedure
console.log(`This process is pid ${process.pid}`);
process.stdin.resume(); //so the program will not close instantly

function exitHandler(options, exitCode) {

  const fs = require('fs');
  var data = "Cleaning up Moxie"
  fs.writeFile('statusMainScreen.txt', data,
    function(err) {
      if (options.cleanup) console.log('clean')
      if (exitCode || exitCode === 0) console.log(exitCode)
      if (options.exit) process.exit()
    });


}
//this one is if they close the window normally
window.onbeforeunload = confirmExit;
confirmExit();

function confirmExit() {
  var pdids = fs.readFileSync('torchat/pid-torchat.txt', 'utf8')
  var torchat_pid = pdids.split('|')[1]
  var torsh_pid = pdids.split('|')[3]
  console.log(torchat_pid + ' ' + tor_pid)

  var util = require('util'),
    exec = require('child_process').exec,
    child;
//check if its possible to rename the name so we can not waste our time finding the tor id
  child = exec('kill -9 ' + torchat_pid + '| kill -9' + (torsh_pid + 1) + '| kill -9' + (torsh_pid), // command line argument directly in string
    function(error, stdout, stderr) { // one easy function to capture data/errors
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });

}

//do something when app is closing
process.on('SIGUSR2', exitHandler.bind(null, {
  exit: true
}));
process.on('exit', exitHandler.bind(null, {
  cleanup: true
}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {
  exit: true
}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {
  exit: true
}));
process.on('SIGUSR2', exitHandler.bind(null, {
  exit: true
}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {
  exit: true
}));
