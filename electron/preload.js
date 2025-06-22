const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {

    openDbFolder: () => ipcRenderer.invoke('db:open-folder'),
    
  // Auth
  login: (username, password) => ipcRenderer.invoke('user:login', username, password),
  createUser: (data) => ipcRenderer.invoke('user:create', data),

  // Actes
  getActes: () => ipcRenderer.invoke('actes:get'),
  addActe: (data) => ipcRenderer.invoke('actes:add', data),
  deleteActe: (id) => ipcRenderer.invoke('actes:delete', id),
  updateActe: (data) => ipcRenderer.invoke('actes:update', data),


  // Assurés  
  getAssures: () => ipcRenderer.invoke('assures:get'),
  addAssure: (data) => ipcRenderer.invoke('assures:add', data),

  // bénéficiaires
  getBeneficiaires: (matricule) => ipcRenderer.invoke('beneficiaires:getByMatricule', matricule),
  addBeneficiaire: (data) => ipcRenderer.invoke('beneficiaires:add', data),
deleteBeneficiaire: (id) => ipcRenderer.invoke('beneficiaires:delete', id),


  // AutoUpdater
  checkForUpdate: () => ipcRenderer.invoke('update:check'),
  installUpdate: () => ipcRenderer.invoke('update:install'),

  onUpdateAvailable: (cb) => ipcRenderer.on('update-available', cb),
  onUpdateProgress: (cb) => ipcRenderer.on('update-progress', (e, p) => cb(p)),
  onUpdateDownloaded: (cb) => ipcRenderer.on('update-downloaded', cb),
})
