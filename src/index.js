const { app, BrowserWindow } = require('electron')
//I kept this as simple as possible.
//Create a new browser window.
//Load index.html as first page
function createWindow () {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadFile('index.html')
}
app.on('ready', createWindow)
