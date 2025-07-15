const { app, BrowserWindow, ipcMain, shell } = require('electron')
const { autoUpdater } = require('electron-updater')
const path = require('path')
const createDB = require('./db/initDB.js')

let mainWindow
let splash
let db = null

const isDev = !app.isPackaged
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// 🖼️ Splash screen (chargement)
function showSplash() {
  splash = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    resizable: false,
    show: true,
    transparent: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  splash.loadFile(path.join(__dirname, 'splash.html'))
}

// 🧱 Fenêtre principale
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    icon: path.join(__dirname, '../assets/icon.ico'),
    frame: true, // 👈 custom titlebar
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
  } else {
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'))
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
}

// 🏁 Étapes de démarrage avec splash
async function launchAppWithSteps() {
  showSplash()

  const steps = [
    { label: 'Initialisation de la base de données', percent: 20, action: async () => { db = await createDB() } },
    { label: 'Chargément des composants', percent: 40, action: async () => delay(1500) },
    { label: 'Préparation de l’interface', percent: 80, action: async () => delay(1500) },
    { label: 'Finalisation', percent: 100, action: async () => delay(1000) },
  ]

  for (const step of steps) {
    splash.webContents.send('splash:label', step.label)
    splash.webContents.send('splash:progress', step.percent)
    await step.action()
  }

  splash.close()
  createWindow()
}

// 🔄 Mise à jour auto
autoUpdater.on('update-available', () => mainWindow?.webContents.send('update-available'))
autoUpdater.on('download-progress', progress => mainWindow?.webContents.send('update-progress', progress))
autoUpdater.on('update-downloaded', () => mainWindow?.webContents.send('update-downloaded'))

ipcMain.handle('update:check', () => autoUpdater.checkForUpdates())
ipcMain.handle('update:install', () => autoUpdater.quitAndInstall())

// 🌍 Accès au dossier DB
ipcMain.handle('db:open-folder', () => {
  const userDataPath = app.getPath('userData')
  return shell.openPath(userDataPath)
})

// 🧠 IPC custom titlebar
ipcMain.on('window:minimize', () => mainWindow.minimize())
ipcMain.on('window:maximize', () => {
  mainWindow.maximize()
  mainWindow.webContents.send('window:maximized')
})
ipcMain.on('window:restore', () => {
  mainWindow.restore()
  mainWindow.webContents.send('window:restored')
})
ipcMain.on('window:close', () => mainWindow.close())

// ✅ Démarrage app
app.whenReady().then(async () => {
  await launchAppWithSteps()

  // 📡 Handlers connectés à la base SQLite
  require('./handlers/user')(ipcMain, db)
  require('./handlers/actes')(ipcMain, db)
  require('./handlers/assures')(ipcMain, db)
  require('./handlers/beneficiaires')(ipcMain, db)
  require('./handlers/clients')(ipcMain, db)
  require('./handlers/centres')(ipcMain, db)
  require('./handlers/assurances')(ipcMain, db)

  if (!isDev) {
    setTimeout(() => autoUpdater.checkForUpdatesAndNotify(), 3000)
  }

  ipcMain.handle('ping', () => 'pong depuis Electron 🧠')
})

// 🔐 Sécurité Mac
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
