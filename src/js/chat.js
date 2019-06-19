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

function getChatID(SendToID) {
  var fs = require('fs');
  var data = fs.readFileSync('torchat/buddy-chatProperties.txt');
  return data.toString().split("'" + SendToID +"':")[1].split("}")[0]
}
var chat = document.getElementById("buddyname")
chat.innerHTML += localStorage.friendChat.split(' ')[1]

const fs = require("fs"); // Or `import fs from "fs";` with ESM
if (fs.existsSync('torchat/' + localStorage.friendChat.split(' ')[0] + '.txt') == false) {
  fs.writeFile('torchat/' + localStorage.friendChat.split(' ')[0] + '.txt', "", function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was created!");
  });
}

function sendText() {
  if (isReleaseBuild() == 0) {
    var textToSend = document.getElementById("textSent").value
    document.getElementById("textSent").value = ""

    //Parse to JSON
    var obj = new Object();
    obj.sender = getID();
    obj.reciever = localStorage.friendChat.split(' ')[0];
    obj.textValue = textToSend;
    obj.textType = "SimpleMessage";
    obj.chatID = getChatID(localStorage.friendChat.split(' ')[0]);

    var jsonString = JSON.stringify(obj);
    console.log(jsonString);
    const fs = require('fs');

    fs.appendFile("sendBuffer.txt", jsonString + "\n", function(err) {
      if (err) {
        return console.log(err);
      }
    });
  }

  if (isReleaseBuild() == 1) {
    var textToSend = document.getElementById("textSent").value
    document.getElementById("textSent").value = ""
    console.log(textToSend)
    const fs = require('fs');
    fs.appendFile("torchat/dist/sendBuffer.txt", localStorage.friendChat.split(' ')[0] + ":" + textToSend + "\n", function(err) {
      if (err) {
        return console.log(err);
      }
    });
  }

  if (isReleaseBuild() == 2) {
    var textToSend = document.getElementById("textSent").value
    document.getElementById("textSent").value = ""
    console.log(textToSend)
    const fs = require('fs');
    fs.appendFile("torchat/sendBuffer.txt", localStorage.friendChat.split(' ')[0] + ":" + textToSend + "\n", function(err) {
      if (err) {
        return console.log(err);
      }
    });
  }

}

setInterval(other, 1000);

function getDateTime() {

  var date = new Date();

  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;

  var min = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;

  var sec = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;

  var year = date.getFullYear();

  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;

  var day = date.getDate();
  day = (day < 10 ? "0" : "") + day;

  return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}

function deleteDuplicatesFromArray(sc){
  let l = sc.length, r = [], seen = new Set()
  outer:
    for (let i = 0; i < l; i++){
      let v = sc[i];
      if (seen.has(v)) continue outer;
      seen.add(v)
      r.push(v)
    }
    return r
}

function other() {
  const fs = require('fs');
  if (isReleaseBuild() == 0) {
    var data = fs.readFileSync('torchat/' + localStorage.friendChat.split(' ')[0] + '.txt', 'utf8')
    cleaneddata = deleteDuplicatesFromArray(data.split('\n'))
  }
  if (isReleaseBuild() == 1) {
    var data = fs.readFileSync('torchat/dist/torchat/' + localStorage.friendChat.split(' ')[0] + '.txt', 'utf8')
  }
  if (isReleaseBuild() == 2) {
    var data = fs.readFileSync('torchat/dist/' + localStorage.friendChat.split(' ')[0] + '.txt', 'utf8')
  }


  var index = 0;
  var chat = document.getElementById("chat")
  data = cleaneddata
  chat.innerHTML = ""
  for (i = 0; i < cleaneddata.length; i++) {
    if (cleaneddata[i] != "") {
      console.log(cleaneddata[i])

      if (cleaneddata[i].split(':')[0] != "You") {
        var chat = document.getElementById("chat")
        chat.innerHTML += '<li class="other"> <div class="avatar"><img src="https://i.imgur.com/DY6gND0.png" draggable="false"/></div> <div class="msg"> <p>' + localStorage.friendChat.split(' ')[1] + '</p> <p>' + cleaneddata[i].split(':')[
          1] + '</p> <time>20:17</time> </div> </li>'
      } else {
        var chat = document.getElementById("chat")
        chat.innerHTML += '<li class="self"> <div class="avatar"><img src="https://i.imgur.com/DY6gND0.png" draggable="false"/></div> <div class="msg"> <p>You</p> <p>' + cleaneddata[i].split(':')[1] + '</p> <time>20:17</time> </div> </li>'
      }
    }
  }
}
