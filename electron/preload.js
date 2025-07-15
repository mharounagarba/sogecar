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
  getActeById: (id) => ipcRenderer.invoke('actes:getById', id),
  addActe: (data) => ipcRenderer.invoke('actes:add', data),
  deleteActe: (id) => ipcRenderer.invoke('actes:delete', id),
  updateActe: (data) => ipcRenderer.invoke('actes:update', data),


  // Assurés  
  getAssures: () => ipcRenderer.invoke('assures:get'),
    getAssureById: (id) => ipcRenderer.invoke('assures:getById', id),
  addAssure: (data) => ipcRenderer.invoke('assures:add', data),
  deleteAssure: (id) => ipcRenderer.invoke('assures:delete', id),
  updateAssure: (data) => ipcRenderer.invoke('assures:update', data),

  // bénéficiaires
  getBeneficiaires: (matricule) => ipcRenderer.invoke('beneficiaires:getByMatricule', matricule),
  getBeneficiaireById: (id) => ipcRenderer.invoke('beneficiaires:getById', id),
  addBeneficiaire: (data) => ipcRenderer.invoke('beneficiaires:add', data),
deleteBeneficiaire: (id) => ipcRenderer.invoke('beneficiaires:delete', id),
 getAllBeneficiaires: () => ipcRenderer.invoke('getAllBeneficiaires'),
 updateBeneficiaire: (data) => ipcRenderer.invoke('beneficiaires:update', data),

 // 🚀 Clients
  getClients: () => ipcRenderer.invoke('clients:get'),
   getClientById: (id) => ipcRenderer.invoke('clients:getById', id),
  addClient: (data) => ipcRenderer.invoke('clients:add', data),
  updateClient: (data) => ipcRenderer.invoke('clients:update', data),
  deleteClient: (id) => ipcRenderer.invoke('clients:delete', id),

  // Centres
  getCentres: () => ipcRenderer.invoke('centres:get'),
  getCentreById: (id) => ipcRenderer.invoke('centres:getById', id),
  addCentre: (data) => ipcRenderer.invoke('centres:add', data),
  updateCentre: (data) => ipcRenderer.invoke('centres:update', data),
  deleteCentre: (id) => ipcRenderer.invoke('centres:delete', id),

  // Assurances
  getAssurances: () => ipcRenderer.invoke('assurances:get'),
  getAssuranceById: (id) => ipcRenderer.invoke('assurances:getById', id),
  addAssurances: (data) => ipcRenderer.invoke('assurances:add', data),
  updateAssurances: (data) => ipcRenderer.invoke('assurances:update', data),
  deleteAssurances: (id) => ipcRenderer.invoke('assurances:delete', id),

  // AutoUpdater
  checkForUpdate: () => ipcRenderer.invoke('update:check'),
  installUpdate: () => ipcRenderer.invoke('update:install'),
  onUpdateAvailable: (cb) => ipcRenderer.on('update-available', cb),
  onUpdateProgress: (cb) => ipcRenderer.on('update-progress', (e, p) => cb(p)),
  onUpdateDownloaded: (cb) => ipcRenderer.on('update-downloaded', cb),

  // TitleBar
  minimize: () => ipcRenderer.send('window:minimize'),
  maximize: () => ipcRenderer.send('window:maximize'),
  restore: () => ipcRenderer.send('window:restore'),
  close: () => ipcRenderer.send('window:close'),
  onWindowMaximized: (callback) => ipcRenderer.on('window:maximized', callback),
  onWindowRestored: (callback) => ipcRenderer.on('window:restored', callback)

})
