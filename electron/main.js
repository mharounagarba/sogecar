const { app, BrowserWindow, ipcMain, shell } = require('electron')
const { autoUpdater } = require('electron-updater')
const path = require('path')

const createDB = require('./db/initDB.js')

// 🧠 Variable globale pour accéder à la fenêtre principale
let mainWindow

// 👨‍🔧 Dev mode (localhost) ou prod (fichier)
const isDev = !app.isPackaged

// ✅ Création de la fenêtre principale
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
  } else {
    mainWindow.loadFile(path.join(__dirname, '../build/index.html')) // build Vite
  }
}

// 🔁 MISE À JOUR AUTOMATIQUE
autoUpdater.on('update-available', () => {
  mainWindow?.webContents.send('update-available')
})

autoUpdater.on('download-progress', (progress) => {
  mainWindow?.webContents.send('update-progress', progress)
})

autoUpdater.on('update-downloaded', () => {
  mainWindow?.webContents.send('update-downloaded')
})

// Appels IPC pour React
ipcMain.handle('update:check', () => {
  autoUpdater.checkForUpdates()
})

ipcMain.handle('update:install', () => {
  autoUpdater.quitAndInstall()
})

// ✅ Lancement de l’app
app.whenReady().then(() => {
  const db = createDB() // ✅ Crée et retourne l’instance
  createWindow()        // ✅ Ensuite on crée la fenêtre

  // ✅ Handlers connectés à la base
  require('./handlers/user.js')(ipcMain, db)
  require('./handlers/actes.js')(ipcMain, db)
  require('./handlers/assures.js')(ipcMain, db)
  require('./handlers/beneficiaires.js')(ipcMain, db)
  require('./handlers/clients')(ipcMain, db)
require('./handlers/centres')(ipcMain, db)
require('./handlers/assurances')(ipcMain, db)


  if (!isDev) {
    setTimeout(() => {
      autoUpdater.checkForUpdatesAndNotify()
    }, 3000)
  }

  ipcMain.handle('ping', () => 'pong depuis Electron 🧠')
})


// 🔐 MacOS + fermeture
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})


ipcMain.handle('db:open-folder', () => {
  const userDataPath = app.getPath('userData')
  shell.openPath(userDataPath)
})