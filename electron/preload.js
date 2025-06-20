const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  // Auth
  login: (username, password) => ipcRenderer.invoke('user:login', username, password),
  createUser: (data) => ipcRenderer.invoke('user:create', data),

  // Actes
  getActes: () => ipcRenderer.invoke('actes:get'),
  addActe: (data) => ipcRenderer.invoke('actes:add', data),
  deleteActe: (id) => ipcRenderer.invoke('actes:delete', id),

  // Assurés & bénéficiaires
  getAssures: () => ipcRenderer.invoke('assures:get'),
  addAssure: (data) => ipcRenderer.invoke('assures:add', data),

  getBeneficiaires: (matricule) => ipcRenderer.invoke('beneficiaires:getByMatricule', matricule),
  addBeneficiaire: (data) => ipcRenderer.invoke('beneficiaires:add', data)
})
