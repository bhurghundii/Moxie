/* This is a libary of functions for Moxie which persist on every page.
Functions which are useful for processing or reading / writing or whatever go here */

function toggleVisibility(id_tag) {
  current_tag = document.getElementById(id_tag).style.display
  if (current_tag == "") {
    document.getElementById(id_tag).style.display = "block";
  }
  if (current_tag == "block") {
    document.getElementById(id_tag).style.display = "";
  }
}



//0 is dev, 1 is LINUX, 2 is Windows, 3 is Android, 4 is IOS.
function isReleaseBuild() {
  var fs = require('fs');
  var isRelease = 0
  try {
    data = fs.readFileSync('MoxieFlags.config', 'utf8');
    console.log(data.toString());
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

/*var console = {};
console.log = function(text) {
  if (isReleaseBuild() != 0) {
    var fs = require('fs');
    fs.appendFile("moxielogout.txt", text, function(err) {
      if (err) {
        return console.log(err);
      }
    });
  }
}; */
