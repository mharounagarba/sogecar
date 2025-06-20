const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const Database = require('better-sqlite3')
const createDB = require('./db/initDB.js')

const isDev = !app.isPackaged

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  })

  if (isDev) {
    win.loadURL('http://localhost:5173')
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

app.whenReady().then(() => {
  createDB()
  createWindow()

  const db = new Database(path.join(__dirname, 'db/sogecar.db'))

  require('./handlers/user')(ipcMain, db)
  require('./handlers/actes')(ipcMain, db)
  require('./handlers/assures')(ipcMain, db)
  require('./handlers/beneficiaires')(ipcMain, db)

  ipcMain.handle('ping', () => 'pong depuis Electron 🧠')
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
