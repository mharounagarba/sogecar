module.exports = (ipcMain, db) => {
  ipcMain.handle('beneficiaires:getByMatricule', (e, matricule) => {
    return db.prepare('SELECT * FROM beneficiaires WHERE matriculeAssure = ?').all(matricule)
  })

  ipcMain.handle('beneficiaires:add', (e, data) => {
    db.prepare(`
      INSERT INTO beneficiaires (matriculeAssure, nom, prenom, dateNais, lienFamille)
      VALUES (?, ?, ?, ?, ?)
    `).run(data.matriculeAssure, data.nom, data.prenom, data.dateNais, data.lienFamille)
    return { success: true }
  })
}
