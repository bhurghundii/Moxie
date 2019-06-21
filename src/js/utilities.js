/* This is a libary of functions for Moxie which persist on every page.
Functions which are useful for processing or reading / writing or whatever go here */

//This hides or shows a div.
function toggleVisibility(id_tag) {
  current_tag = document.getElementById(id_tag).style.display
  if (current_tag == "") {
    document.getElementById(id_tag).style.display = "block";
  }
  if (current_tag == "block") {
    document.getElementById(id_tag).style.display = "";
  }
}

//When you build (BUILDSCRIPTS), you sed into a release flag file your target platform
//0 is dev, 1 is LINUX, 2 is Windows, 3 is Android, 4 is IOS.
function isReleaseBuild() {
  var fs = require('fs');
  var isRelease = 0
  try {
    data = fs.readFileSync('MoxieFlags.config', 'utf8');
  //  console.log(data.toString());
    if (data.indexOf('1') > 0) {
      isRelease = 1;
    }
    if (data.indexOf('2') > 1) {
      isRelease = 2;
    }
  } catch (e) {
    console.log('Error:', e.stack);
  }
  return isRelease
}

//Cleans out Moxie by getting rid of the Tor files that it needs to make a route
//Deletes your personal Moxie details like your send buffer and self generated info
function resetMoxie() {
  console.log('Cleaning MOXIE')
  fs.unlink('me.info', (err) => {
    if (err) throw err;
  });
  fs.unlink('sendBuffer.txt', (err) => {
    if (err) throw err;
  });

  console.log('Cleaning BUMP')
  fs.unlink('historyaddresses.txt', (err) => {
    if (err) throw err;
  });

  console.log('Cleaning BUMP')
  fs.unlink('torchat/torchat.ini', (err) => {
    if (err) throw err;
  });
  fs.unlink('torchat/buddy-list.txt', (err) => {
    if (err) throw err;
  });
  fs.unlink('torchat/buddy-list.txt', (err) => {
    if (err) throw err;
  });
  fs.unlink('torchat/Tor/hidden_service/hostname', (err) => {
    if (err) throw err;
  });
  fs.unlink('torchat/Tor/hidden_service/private_key', (err) => {
    if (err) throw err;
  });
  fs.unlink('torchat/statusUpdates.txt', (err) => {
    if (err) throw err;
  });
}

function getID() {
  file = "me.info";
  var fs = require('fs');
  fs.readFile(file, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    return data.split(' ')[0];
  });
}

function getName() {
  file = "me.info";
  var fs = require('fs');
  fs.readFile(file, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    return data.split(' ')[1];
  });
}

//This was the old kill command. Only works on systems which support bash
//Kills torchat
function executeKILLSig() {
  var util = require('util'),
    exec = require('child_process').exec,
    child;

  child = exec('kill -9 ' + torchat_pid + '| kill -9' + (torsh_pid + 1) + '| kill -9' + (torsh_pid), // command line argument directly in string
    function(error, stdout, stderr) { // one easy function to capture data/errors
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
}
