const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const { spawn } = require('child_process');

const server = http.createServer();
const io = new Server(server);

let mainWindow;
let pythonProcess = null;
let normalPosition = { x: 100, y: 100 };

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    icon: path.join(__dirname, 'keyboard.ico'),
    show: false 
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.setMenu(null);
  
  mainWindow.setResizable(false);

  mainWindow.setOpacity(0.9);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  const { globalShortcut } = require('electron');
  globalShortcut.register('Alt+F4', () => {
    app.quit();
  });

  globalShortcut.register('Control+Shift+H', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('toggle-display-mode');
    }
  });
  
  mainWindow.on('closed', function () {
    mainWindow = null;
    if (pythonProcess) {
      pythonProcess.kill('SIGTERM');
      pythonProcess = null;
    }
  });
}

function startPythonHook() {
  const isDev = !app.isPackaged;
  let pythonExecutable;
  
  if (isDev) {
    const pythonScript = path.join(__dirname, 'key_hook.py');
    pythonExecutable = 'python';
    const pythonArgs = [pythonScript];
    
    try {
      pythonProcess = spawn(pythonExecutable, pythonArgs, {
        windowsHide: true,
        stdio: 'pipe'
      });
    } catch (error) {
      try {
        pythonProcess = spawn('py', pythonArgs, {
          windowsHide: true,
          stdio: 'pipe'
        });
      } catch (fallbackError) {
        console.error('Neither python nor py available:', fallbackError);
        return;
      }
    }
  } else {
    pythonExecutable = path.join(process.resourcesPath, 'key_hook.exe');
    
    try {
      pythonProcess = spawn(pythonExecutable, [], {
        windowsHide: true,
        stdio: 'pipe'
      });
    } catch (error) {
      console.error('Error starting compiled Python-Hooks:', error);
      return;
    }
  }

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python Hook: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python Hook Error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python Hook ended with code: ${code}`);
    pythonProcess = null;
  });

  pythonProcess.on('error', (error) => {
    console.error('Error starting the Python-Hook:', error);
    pythonProcess = null;
  });

  console.log('Python Hook started');
}

app.whenReady().then(() => {
  createWindow();
  
  setTimeout(() => {
    startPythonHook();
  }, 1000);

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (pythonProcess) {
    pythonProcess.kill('SIGTERM');
    pythonProcess = null;
  }
  
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  if (pythonProcess) {
    pythonProcess.kill('SIGTERM');
    pythonProcess = null;
  }
});

ipcMain.on('move-window', (event, { x, y }) => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.setPosition(x, y);
    const currentPos = mainWindow.getPosition();
    if (currentPos[0] > -2000) { 
      normalPosition = { x: currentPos[0], y: currentPos[1] };
    }
  }
});

ipcMain.on('get-window-position', (event) => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    const position = mainWindow.getPosition();
    event.sender.send('window-position', { x: position[0], y: position[1] });
  }
});

ipcMain.on('set-display-mode', (event, mode) => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    switch (mode) {
      case 'normal':
        mainWindow.setOpacity(0.9);
        mainWindow.setSkipTaskbar(false);
        mainWindow.setAlwaysOnTop(true);
        mainWindow.setIgnoreMouseEvents(false);
        mainWindow.setPosition(normalPosition.x, normalPosition.y);
        mainWindow.show();
        break;
        
      case 'obs-only':
        mainWindow.setOpacity(0.01);
        mainWindow.setSkipTaskbar(true);
        mainWindow.setAlwaysOnTop(false);
        mainWindow.setIgnoreMouseEvents(true, { forward: true });
        mainWindow.blur();
        break;
        
      case 'off-screen':
        const currentPos = mainWindow.getPosition();
        normalPosition = { x: currentPos[0], y: currentPos[1] };
        mainWindow.setOpacity(0.9);
        mainWindow.setSkipTaskbar(true);
        mainWindow.setAlwaysOnTop(false);
        mainWindow.setIgnoreMouseEvents(false);
        mainWindow.setPosition(-3000, normalPosition.y);
        break;
    }
  }
});

io.on('connection', (socket) => {
  console.log('Python-Hook connected');

  socket.on('keydown', (data) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('keydown', data);
    }
  });

  socket.on('keyup', (data) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('keyup', data);
    }
  });
});

server.listen(8734, () => {
  console.log('Socket.io-Server running on port 8734');
});
