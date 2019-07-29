const {
  app,
  BrowserWindow
} = require('electron')
//I kept this as simple as possible.
//Create a new browser window.
//Load index.html as first page
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600
  })
  win.loadFile('index.html')
}
app.on('ready', createWindow)

function run_cmd(cmd, args, callBack ) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";

    child.stdout.on('data', function (buffer) { resp += buffer.toString() });
    child.stdout.on('end', function() { callBack (resp) });
}

function confirmExit() {
  var osvar = process.platform;

  var opsys = process.platform;
  if (opsys == "darwin") {
      opsys = "MacOS";
  } else if (opsys == "win32" || opsys == "win64") {
      opsys = "Windows";
  } else if (opsys == "linux") {
      opsys = "Linux";
      'use strict';

      const { spawnSync } = require( 'child_process' ),
      ls = spawnSync( 'fuser', [ '-k', '11009/tcp' ] );

      var fs = require('fs');
      var data = fs.readFileSync('torchat/Tor/tor.pid');
      pid = data.toString().replace(/\s+/g, '');
      console.log(pid)
      lsa = spawnSync( 'kill', [ '-9', pid ] );
  }



}

process.stdin.resume(); //so the program will not close instantly

function exitHandler(options, exitCode) {
  if (options.cleanup) confirmExit();
  if (exitCode || exitCode === 0) console.log(exitCode);
  if (options.exit) process.exit();
}

//do something when app is closing
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
