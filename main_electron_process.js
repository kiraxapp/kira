//@ts-check
const { app, BrowserWindow } = require('electron');

const isDevelopment = process.env.NODE_ENV !== 'production';

let mainWindow;

function createWindow() {
  const window = new BrowserWindow({
    height: 600,
    width: 800,
  });

  if (isDevelopment) {
    window.webContents.openDevTools();
  }

  console.log(process.env.NODE_ENV);

  if (isDevelopment) {
    window.loadURL(`http://localhost:8000`);
  } else {
    process.exit(0);
  }

  window.on('closed', () => {
    mainWindow = null;
  });

  window.webContents.on('devtools-opened', () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  return window;
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createWindow();
  }
});

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createWindow();
});
