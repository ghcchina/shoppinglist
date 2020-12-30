const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

// Listen for app to vbe ready
app.on('ready', function(){
  // Create new window
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }));
  /*
  // Quit app when closed
  mainWindow.on('closed', function(){
    app.quit();
  })
  */

  // build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // insert menu
  Menu.setApplicationMenu(mainMenu);
});

// handler for create add window
function createAddWindow(){
  // Create new window
  addWindow = new BrowserWindow({
    width: 500,
    height: 400,
    title: 'Add Item'
  });
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'addWindow.html'),
    protocol: 'file:',
    slashes: true
  }));
  // Gabage collection
  addWindow.on('close', function(){
    addWindow = null;
  });
}

// menu template
const mainMenuTemplate = [
  {
    label: 'File',
    submenu:[
      {
        label: 'Add Item',
        click(){
          createAddWindow();
        }
      },
      {
        label: 'Clear Items'
      },
      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  },
  {
    label: 'About'
  }
];

// If mac, add empty object to menu
if(process.platform == 'darwin') {
  mainMenuTemplate.unshift({
    role: 'about'
  });
}

if(process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'Dev Tools',
    submenu:[
      {
        label: 'Toggle DevTools',
        accelerator: process.platform== 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  });
}

