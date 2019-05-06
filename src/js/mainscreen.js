var watch = require('node-watch');
const readline = require('readline');
const fs = require('fs');

function mainPageStart() {
  file = ""
  if (isReleaseBuild() == 0) {
    file = "torchat/buddy-list.txt";
  }
  if (isReleaseBuild() == 1) {
    file = "torchat/dist/torchat/buddy-list.txt";
  }
  if (isReleaseBuild() == 2) {
    file = "torchat/dist/buddy-list.txt";
  }

  const rl = readline.createInterface({
    input: fs.createReadStream(file)
  });
  var chat = document.getElementById("leftMenu")
  rl.on('line', (line) => {
    console.log(`Line from file: ${line}`);
    chat.innerHTML += '<div onclick="localStorage.friendChat = &quot;' + line + '&quot;;" > <a href="chat.html" class="w3-bar-item w3-button"> <img class="img-circle" src="http://www.imran.com/xyper_images/icon-user-default.png"> ' + line
      .split(" ")[1] + '</a> </div>'
  });

}

function sendStatusUpdate() {

  var statusText = document.getElementById("statusSent").value;
  document.getElementById("statusSent").value = ""
  //get your entire friends list

  if (isReleaseBuild() == 0) {
    var friendslist = fs.readFileSync('torchat/buddy-list.txt', 'utf8')
  }

  if (isReleaseBuild() == 1) {
    var friendslist = fs.readFileSync('torchat/dist/torchat/buddy-list.txt', 'utf8')
  }

  if (isReleaseBuild() == 2) {
    var friendslist = fs.readFileSync('torchat/dist/buddy-list.txt', 'utf8')
  }


  for (var i = 0; i < friendslist.split('\n').length - 1; i++) {
    console.log(friendslist.split('\n')[i].split(' ')[0] + " " + statusText)
    if (isReleaseBuild() == 0) {
      fs.appendFile("sendBuffer.txt", friendslist.split('\n')[i].split(' ')[i] + ":status#" + statusText + "\n", function(err) {
        if (err) {
          return console.log(err);
        }
      });
    }

    if (isReleaseBuild() == 1) {
      fs.appendFile("torchat/dist/sendBuffer.txt", friendslist.split('\n')[i].split(' ')[i] + ":status#" + statusText + "\n", function(err) {
        if (err) {
          return console.log(err);
        }
      });
    }

    if (isReleaseBuild() == 2) {
      fs.appendFile("torchat/sendBuffer.txt", friendslist.split('\n')[i].split(' ')[i] + ":status#" + statusText + "\n", function(err) {
        if (err) {
          return console.log(err);
        }
      });
    }

  }
}

if (isReleaseBuild() == 0) {
  watch('torchat/torchatready.txt', function(event, filename) {
    checkTorChatStatus();
  })
  watch('torchat/statusUpdates.txt', function(event, filename) {
    document.getElementById("ContentID").innerHTML = "";
    StatusUpdate();
  })

}
if (isReleaseBuild() == 1) {
  watch('torchat/dist/torchat/torchatready.txt', function(event, filename) {
    checkTorChatStatus();
  })
  watch('torchat/dist/torchat/statusUpdates.txt', function(event, filename) {
    document.getElementById("ContentID").innerHTML = "";
    StatusUpdate();
  })
}

if (isReleaseBuild() == 2) {
  watch('torchat/dist/torchatready.txt', function(event, filename) {
    checkTorChatStatus();
  })

  watch('torchat/dist/statusUpdates.txt', function(event, filename) {
    document.getElementById("ContentID").innerHTML = "";
    StatusUpdate();
  })
}

if (isReleaseBuild() == 0) {
  watch('torchat/buddy-list.txt', function(event, filename) {
    mainPageStart();
  })
}

if (isReleaseBuild() == 1) {
  watch('torchat/dist/torchat/buddy-list.txt', function(event, filename) {
    mainPageStart();
  })
}

if (isReleaseBuild() == 2) {
  watch('torchat/dist/torchatready.txt', function(event, filename) {
    checkTorChatStatus();
  })
  watch('torchat/dist/statusUpdates.txt', function(event, filename) {
    document.getElementById("ContentID").innerHTML = "";
    StatusUpdate();
  })
}

function checkTorChatStatus() {
  const fs = require('fs');
  if (isReleaseBuild() == 0) {
    var data = fs.readFileSync('torchat/torchatready.txt', 'utf8')
  }
  if (isReleaseBuild() == 1) {
    var data = fs.readFileSync('torchat/dist/torchat/torchatready.txt', 'utf8')
  }

  if (isReleaseBuild() == 2) {
    var data = fs.readFileSync('torchat/dist/torchatready.txt', 'utf8')
  }


  if (data == 'Ready') {
    document.getElementById("Status").style.backgroundColor = "#77dd77";
    document.getElementById("Status").innerHTML = 'MOXIE is online';
    document.getElementById("Status").visible = 'hidden';
  } else {
    document.getElementById("Status").style.backgroundColor = "#dd7777";
    document.getElementById("Status").innerHTML = 'MOXIE is not online. We are getting ready...';
  }
}

function openLeftMenu() {
  document.getElementById("leftMenu").style.display = "block";
}

function closeLeftMenu() {
  document.getElementById("leftMenu").style.display = "none";
}

function openRightMenu() {
  document.getElementById("rightMenu").style.display = "block";
  var data = "TRUE"
  fs.writeFile('statusMainScreen.txt', data,
    function(err) {
      if (err) throw err;
      console.log("Data is written to file successfully.")
    });
}

function closeRightMenu() {
  document.getElementById("rightMenu").style.display = "none";
  var data = "FALSE"
  fs.writeFile('statusMainScreen.txt', data,
    function(err) {
      if (err) throw err;
      console.log("Data is written to file successfully.")
    });
}



StatusUpdate();

function StatusUpdate() {
  if (isReleaseBuild() == 0) {
    var data = fs.readFileSync('torchat/statusUpdates.txt', 'utf8')
    for (var i = 0; i < data.split('\n').length - 1; i++) {
      var content = document.getElementById("ContentID")
      content.innerHTML += "<div class='StatusUpdateMessage'> <p style='font-weight: bold;'>" + data.split('\n')[i].split('#')[0] + "</p>" + "<p>" + data.split('\n')[i].split('#')[1] + "</p> <hr style='width: 500px; height:1px;'> </div>"
    }
  }

  if (isReleaseBuild() == 1) {
    var data = fs.readFileSync('torchat/dist/torchat/statusUpdates.txt', 'utf8')
    for (var i = 0; i < data.split('\n').length - 1; i++) {
      var content = document.getElementById("ContentID")
      content.innerHTML += "<h2>" + data.split('\n')[i].split('#')[0] + "</h2>" + "<h4>" + data.split('\n')[i].split('#')[1] + "</h4>"
    }
  }

  if (isReleaseBuild() == 2) {
    var data = fs.readFileSync('torchat/dist/statusUpdates.txt', 'utf8')
    for (var i = 0; i < data.split('\n').length - 1; i++) {
      var content = document.getElementById("ContentID")
      content.innerHTML += "<h2>" + data.split('\n')[i].split('#')[0] + "</h2>" + "<h4>" + data.split('\n')[i].split('#')[1] + "</h4>"
    }
  }

}

function addFriendManually() {
  var id = document.getElementById('idInput').value;
  var name = document.getElementById('nameInput').value;
  if (name && id) {
    const fs = require('fs');

    fs.appendFile('torchat/buddy-list.txt', id + ' ' + name + '\n', function(err) {
      if (err) throw err;
      console.log('Saved the friend');
      el = document.getElementById('error');
      el.style.visibility = 'visible';

      el.innerHTML = "Just added " + name
    });
  } else {
    el = document.getElementById('error');
    el.style.visibility = 'visible';
  }
}

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
//confirmExit();

function confirmExit() {
  var pdids = fs.readFileSync('torchat/pid-torchat.txt', 'utf8')
  var torchat_pid = pdids.split('|')[1]
  var torsh_pid = pdids.split('|')[3]

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


mainPageStart();
checkTorChatStatus();
