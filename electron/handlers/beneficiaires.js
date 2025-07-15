module.exports = (ipcMain, db) => {
  ipcMain.handle('beneficiaires:getByMatricule', (e, matricule) => {
    return db.prepare('SELECT * FROM beneficiaires WHERE matriculeAssure = ?').all(matricule)
  })

  ipcMain.handle('getAllBeneficiaires', () => {
    return db.prepare('SELECT * FROM beneficiaires').all()
  })

    ipcMain.handle('beneficiaires:get', () => {
    return db.prepare('SELECT * FROM beneficiaires ORDER BY nom').all()
  })

// Récupérer une 
 ipcMain.handle('beneficiaires:getById', (e, id) => {
    const stmt = db.prepare('SELECT * FROM beneficiaires WHERE id = ?')
    return stmt.get(id)
  })

  ipcMain.handle('beneficiaires:add', (e, data) => {
    db.prepare(`
      INSERT INTO beneficiaires (matriculeAssure, nom, prenom, dateNais, lienFamille)
      VALUES (?, ?, ?, ?, ?)
    `).run(data.matriculeAssure, data.nom, data.prenom, data.dateNais, data.lienFamille)
    return { success: true }
  })

  ipcMain.handle('beneficiaires:update', (e, data) => {
  db.prepare(`
    UPDATE beneficiaires
    SET nom = ?, prenom = ?, dateNais = ?, lienFamille = ?
    WHERE id = ?
  `).run(data.nom, data.prenom, data.dateNais, data.lienFamille, data.id)
  return { success: true }
})

ipcMain.handle('beneficiaires:delete', (e, id) => {
  db.prepare('DELETE FROM beneficiaires WHERE id = ?').run(id)
  return { success: true }
})

}
