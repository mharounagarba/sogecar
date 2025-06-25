const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {

    openDbFolder: () => ipcRenderer.invoke('db:open-folder'),
    
  // Auth
  login: (username, password) => ipcRenderer.invoke('user:login', username, password),
  createUser: (data) => ipcRenderer.invoke('user:create', data),
  updateUser: (user) => ipcRenderer.invoke('user:update', user),
  deleteUser: (id) => ipcRenderer.invoke('user:delete', id),
  getUsers: () => ipcRenderer.invoke('getUsers'),


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
 getAllBeneficiaires: () => ipcRenderer.invoke('getAllBeneficiaires'),
 updateBeneficiaire: (data) => ipcRenderer.invoke('beneficiaires:update', data),

 // 🚀 Clients
  getClients: () => ipcRenderer.invoke('clients:get'),
  addClient: (data) => ipcRenderer.invoke('clients:add', data),
  updateClient: (data) => ipcRenderer.invoke('clients:update', data),
  deleteClient: (id) => ipcRenderer.invoke('clients:delete', id),

  // Centres
  getCentres: () => ipcRenderer.invoke('centres:get'),
  addCentre: (data) => ipcRenderer.invoke('centres:add', data),
  updateCentre: (data) => ipcRenderer.invoke('centres:update', data),
  deleteCentre: (id) => ipcRenderer.invoke('centres:delete', id),

  // Assurances

   getAssurances: () => ipcRenderer.invoke('assurances:get'),
  addAssurances: (data) => ipcRenderer.invoke('assurances:add', data),
  updateAssurances: (data) => ipcRenderer.invoke('assurances:update', data),
  deleteAssurances: (id) => ipcRenderer.invoke('assurances:delete', id),

  // AutoUpdater
  checkForUpdate: () => ipcRenderer.invoke('update:check'),
  installUpdate: () => ipcRenderer.invoke('update:install'),
  onUpdateAvailable: (cb) => ipcRenderer.on('update-available', cb),
  onUpdateProgress: (cb) => ipcRenderer.on('update-progress', (e, p) => cb(p)),
  onUpdateDownloaded: (cb) => ipcRenderer.on('update-downloaded', cb),
})
