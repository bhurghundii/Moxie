window.onload = function() {

  if (isReleaseBuild() == 0) {
    var fs = require('fs');
    fs.writeFile('sendBuffer.txt', '', {
      flag: 'wx'
    }, function(err) {
      if (err) throw err;
      console.log("It's saved!");
    });

    fs.writeFile('torchat/statusUpdates.txt', '', {
      flag: 'wx'
    }, function(err) {
      if (err) throw err;
      console.log("It's saved!");
    });

  }

  if (isReleaseBuild() == 1) {
    var fs = require('fs');
    fs.writeFile('torchat/dist/sendBuffer.txt', '', {
      flag: 'wx'
    }, function(err) {
      if (err) throw err;
      console.log("It's saved!");
    });

    fs.writeFile('torchat/dist/torchat/statusUpdates.txt', '', {
      flag: 'wx'
    }, function(err) {
      if (err) throw err;
      console.log("It's saved!");
    });
  }

  if (isReleaseBuild() == 2) {
    var fs = require('fs');
    fs.writeFile('torchat/sendBuffer.txt', '', {
      flag: 'wx'
    }, function(err) {
      if (err) throw err;
      console.log("It's saved!");
    });

    fs.writeFile('torchat/dist/statusUpdates.txt', '', {
      flag: 'wx'
    }, function(err) {
      if (err) throw err;
      console.log("It's saved!");
    });

  }
  setTimeout(appeardiv, 200);
}

function appeardiv() {


  document.getElementById('1').style.display = "block";
  //Make connection with TOR

  console.log(Date().toLocaleString() + ' Starting TORCHAT \n')

  if (isReleaseBuild() == 0) {
    const ps = require('python-shell')
    ps.PythonShell.run('torchat/torchat.py', null, function(message) {
      console.log(message);
    });
    console.log(Date().toLocaleString() + ' TORCHAT successfully started \n')
    setTimeout(appeardiv2, 500);
  }

  if (isReleaseBuild() == 1) {
    var exec = require('child_process').execFile;
    var startTorchat = function() {
      exec('torchat/dist/torchat/torchat', function(err, data) {
        console.log(err)
      });
      console.log(Date().toLocaleString() + ' TORCHAT successfully started \n')

      setTimeout(appeardiv2, 500);
    }

    startTorchat();
  }


  if (isReleaseBuild() == 2) {
    var exec = require('child_process').execFile;
    var startTorchat = function() {
      exec('torchat/dist/torchat.exe', function(err, data) {
        console.log(err)
      });
      console.log(Date().toLocaleString() + ' TORCHAT successfully started \n')

      setTimeout(appeardiv2, 500);
    }

    startTorchat();
  }

}


function appeardiv2() {
  document.getElementById('2').style.display = "block";
  //Turn on BUMP maybe?
  console.log(Date().toLocaleString() + ' Starting Scanning if Bluetooth is on \n')

  setTimeout(appeardiv3, 800);
}

function appeardiv3() {

  document.getElementById('3').style.display = "block";
  var fs = require('fs');
  console.log(Date().toLocaleString() + ' Checking if me.info exists so we can go to the right place \n')
  if (fs.existsSync('me.info') == false) {
    fs.openSync('me.info', 'w');
    window.location.href = 'rights.html';

  } else {
    var checkIfEmpty = fs.readFileSync('me.info', 'utf8')
    if (checkIfEmpty == "") {
      window.location.href = 'rights.html';
    } else
      window.location.href = 'mainscreen.html';
  }
}
