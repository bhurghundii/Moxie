var watch = require('node-watch');
const readline = require('readline');
const fs = require('fs');
//TO DO: FIGURE HOW TO SHOW ERRORS
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
  chat.innerHTML = ''
  rl.on('line', (line) => {
    if (line !== ""){
    chat.innerHTML += '<div onclick="localStorage.friendChat = &quot;' + line + '&quot;;" > <a href="chat.html" class="w3-bar-item w3-button"> <img class="img-circle" src="http://www.imran.com/xyper_images/icon-user-default.png"> ' + line.split(" ")[1] + '</a> </div>'
  }
  });

}

function getID() {
  file = "me.info";
  var fs = require('fs');
  idstring = ''
  var data = fs.readFileSync(file);
  return data.toString().split(' ')[1]
}

function getName() {
  file = "me.info";
  var fs = require('fs');
  idstring = ''
  var data = fs.readFileSync(file);
  return data.toString().split(' ')[0]
}

function base64EncodeUnicode(str) {
  // UTF8->RAW->B64
  utf8Bytes = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
    return String.fromCharCode('0x' + p1);
  });

  return btoa(utf8Bytes);
}

function base64DecodeUnicode(str) {
  // First we escape the string using encodeURIComponent to get the UTF-8 encoding of the characters,
  // then we convert the percent encodings into raw bytes, and finally feed it to btoa() function.
  utf8Bytes = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
    return String.fromCharCode('0x' + p1);
  });

  return btoa(utf8Bytes);
}

function sendStatusUpdate() {

  var statusText = document.getElementById("statusSent").value;
  document.getElementById("statusSent").value = ""

  if (isReleaseBuild() == 0) {
    var friendslist = fs.readFileSync('torchat/buddy-list.txt', 'utf8')
  }

  if (isReleaseBuild() == 1) {
    var friendslist = fs.readFileSync('torchat/dist/torchat/buddy-list.txt', 'utf8')
  }

  if (isReleaseBuild() == 2) {
    var friendslist = fs.readFileSync('torchat/dist/buddy-list.txt', 'utf8')
  }


  timeSeconds = (new Date() / 1000)


  for (var i = 0; i < friendslist.split('\n').length - 1; i++) {
    console.log(friendslist.split('\n')[i].split(' ')[0] + " " + statusText)
    var obj = new Object();
    obj.sender = getID();
    obj.reciever = friendslist.split('\n')[i].split(' ')[i];
    obj.textValue = timeSeconds + "-" + statusText;
    obj.textType = "Status";
    var jsonString = JSON.stringify(obj);


    if (isReleaseBuild() == 0) {
      fs.appendFile("sendBuffer.txt", jsonString + "\n", function(err) {
        if (err) {
          return console.log(err);
        }
      });
    }

    if (isReleaseBuild() == 1) {
      fs.appendFile("torchat/dist/sendBuffer.txt", jsonString + "\n", function(err) {
        if (err) {
          return console.log(err);
        }
      });
    }

    if (isReleaseBuild() == 2) {
      fs.appendFile("torchat/sendBuffer.txt", jsonString + "\n", function(err) {
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
var LeftMenuisActive = false;
var RightMenuisActive = false;

function toggleLeftMenu() {
  cleanupFriendList()

  if (LeftMenuisActive == false) {
    document.getElementById("leftMenu").style.display = "block";
    LeftMenuisActive = true;
  } else {
    document.getElementById("leftMenu").style.display = "none";
    LeftMenuisActive = false;
  }
}

function toggleRightMenu() {
  if (RightMenuisActive == false) {
    document.getElementById("rightMenu").style.display = "block";
    var data = "TRUE"
    fs.writeFile('statusMainScreen.txt', data,
      function(err) {
        if (err) throw err;
        console.log("Data is written to file successfully.")
      });
    RightMenuisActive = true;
  } else {
    document.getElementById("rightMenu").style.display = "none";
    var data = "FALSE"
    fs.writeFile('statusMainScreen.txt', data,
      function(err) {
        if (err) throw err;
        console.log("Data is written to file successfully.")
      });
    RightMenuisActive = false;
  }
}



StatusUpdate();

function deleteDuplicatesFromArray(sc) {
  let l = sc.length,
    r = [],
    seen = new Set()
  outer:
    for (let i = 0; i < l; i++) {
      let v = sc[i];
      if (seen.has(v)) continue outer;
      seen.add(v)
      r.push(v)
    }
  return r
}

function getUTCTime(d) {
  console.log(d)
  d = d.replace(".", "");
  var date = new Date(parseInt(d));
  console.log(date)
  var formatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  var dateString = date.toLocaleDateString('en-US', formatOptions);
  // => "02/17/2017, 11:32 PM"

  dateString = dateString.replace(',', '')
    .replace('PM', 'p.m.')
    .replace('AM', 'a.m.');
  return dateString
}

function StatusUpdate() {
  if (isReleaseBuild() == 0) {
    var data = fs.readFileSync('torchat/statusUpdates.txt', 'utf8')
    if (data == '') {
      var content = document.getElementById("ContentID")
      content.innerHTML = "<div class='StatusUpdateMessage'> <h1 style='font-weight: bold; color: gray; ' > There are no status messages to show </h1> </div>"
    } else {
      data = deleteDuplicatesFromArray(data.split('\n'))
      for (var i = 0; i < data.length - 1; i++) {
        var content = document.getElementById("ContentID")
        content.innerHTML += "<div class='StatusUpdateMessage'> <p style='font-weight: bold;'>" + data[i].split('#')[0] + "</p>" + "<p>" + data[i].split('#')[1].split('-')[1] + "</p> <p>" + getUTCTime(data[i].split('#')[1].split('-')[0]) + "<hr style='width: 500px; height:1px;'> </div>"
      }
    }
  }

  if (isReleaseBuild() == 1) {
    var data = fs.readFileSync('torchat/dist/torchat/statusUpdates.txt', 'utf8')
    if (data == '') {
      var content = document.getElementById("ContentID")
      content.innerHTML = "<div class='StatusUpdateMessage'> <h1 style='font-weight: bold; color: gray; ' > There are no status messages to show </h1> </div>"
    } else {
      data = deleteDuplicatesFromArray(data.split('\n'))
      for (var i = 0; i < data.length - 1; i++) {
        var content = document.getElementById("ContentID")
        content.innerHTML += "<div class='StatusUpdateMessage'> <p style='font-weight: bold;'>" + data[i].split('#')[0] + "</p>" + "<p>" + data[i].split('#')[1].split('-')[1] + "</p> <p>" + getUTCTime(data[i].split('#')[1].split('-')[0]) + "<hr style='width: 500px; height:1px;'> </div>"
      }
    }
  }

  if (isReleaseBuild() == 2) {
    var data = fs.readFileSync('torchat/dist/statusUpdates.txt', 'utf8')
    if (data == '') {
      var content = document.getElementById("ContentID")
      content.innerHTML = "<div class='StatusUpdateMessage'> <h1 style='font-weight: bold; color: gray; ' > There are no status messages to show </h1> </div>"
    } else {
      data = deleteDuplicatesFromArray(data.split('\n'))
      for (var i = 0; i < data.length - 1; i++) {
        var content = document.getElementById("ContentID")
        content.innerHTML += "<div class='StatusUpdateMessage'> <p style='font-weight: bold;'>" + data[i].split('#')[0] + "</p>" + "<p>" + data[i].split('#')[1].split('-')[1] + "</p> <p>" + getUTCTime(data[i].split('#')[1].split('-')[0]) + "<hr style='width: 500px; height:1px;'> </div>"
      }
    }
  }
}


function addFriendManually() {
  var id = document.getElementById('idInput').value;
  var name = document.getElementById('nameInput').value;
  if (name && id) {
    const fs = require('fs');
    if (id !== "") {
      var obj = new Object();
      obj.sender = getID();
      obj.senderName = getName();
      obj.reciever = id;
      obj.recieverName = name;
      obj.textValue = '!PINGBACKPROTOCOL';
      obj.textType = "AddFriend";

      var jsonString = JSON.stringify(obj);

      if (isReleaseBuild() == 0) {
        fs.appendFile('torchat/buddy-list.txt', id + ' ' + name + '\n', function(err) {
          if (err) throw err;
          el = document.getElementById('error');
          el.style.visibility = 'visible';

          el.innerHTML = "Just added " + name
        });

        fs.appendFile('sendBuffer.txt', jsonString, function(err) {
          if (err) throw err;
        });
      }

      if (isReleaseBuild() == 1) {
        fs.appendFile('torchat/dist/torchat/buddy-list.txt', id + ' ' + name + '\n', function(err) {
          if (err) throw err;
          el = document.getElementById('error');
          el.style.visibility = 'visible';

          el.innerHTML = "Just added " + name
        });

        fs.appendFile('torchat/dist/sendBuffer.txt', jsonString, function(err) {
          if (err) throw err;
        });
      }

      if (isReleaseBuild() == 2) {
        fs.appendFile('torchat/dist/buddy-list.txt', id + ' ' + name + '\n', function(err) {
          if (err) throw err;
          el = document.getElementById('error');
          el.style.visibility = 'visible';

          el.innerHTML = "Just added " + name
        });

        fs.appendFile('torchat/sendBuffer.txt', jsonString, function(err) {
          if (err) throw err;
        });
      }
    } else {
      el = document.getElementById('error');
      el.style.visibility = 'visible';
    }
  }
}


mainPageStart();
checkTorChatStatus();
