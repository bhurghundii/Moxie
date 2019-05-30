
  function showPromptReset() {
    el = document.getElementById('popup1');
    el.style.visibility = 'visible';
  }

  function hidePromptReset() {
    el = document.getElementById('popup1');
    el.style.visibility = 'hidden';
  }

  function showPromptReset2() {
    el = document.getElementById('popup2');
    el.style.visibility = 'visible';
  }

  function hidePromptReset2() {
    el = document.getElementById('popup2');
    el.style.visibility = 'hidden';
  }

  function addFriendManually() {
    var id = document.getElementById('idInput').value;
    var name = document.getElementById('nameInput').value;
    console.log(name)
    console.log(id)
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


  mainPageStart()

  function mainPageStart() {
    file = "me.info";
    fs = require('fs')
    fs.readFile(file, 'utf8', function(err, data) {
      if (err) {
        return console.log(err);
      }
      console.log(data);
      el = document.getElementById('id');
      el.innerHTML += data.split(' ')[0];
      el = document.getElementById('name');
      el.innerHTML += data.split(' ')[1];
    });
  }

  function triggerReset() {
    resetMoxie()
    window.location.href = "welcome.html"
  }

  function isReleaseBuild() {
    var fs = require('fs');
    var isRelease = 0
    try {
      data = fs.readFileSync('MoxieFlags.config', 'utf8');
      console.log(data.toString());
      if (data.indexOf('1') > -1) {
        isRelease = 1;
      }
    } catch (e) {
      console.log('Error:', e.stack);
    }
    return isRelease
  }
