module.exports = (ipcMain, db) => {
  ipcMain.handle('assures:get', () => {
    return db.prepare('SELECT * FROM assures ORDER BY nom').all()
  })

// Récupérer une 
 ipcMain.handle('assures:getById', (e, id) => {
    const stmt = db.prepare('SELECT * FROM assures WHERE id = ?')
    return stmt.get(id)
  })

  ipcMain.handle('assures:add', (e, data) => {
    db.prepare(`
      INSERT INTO assures (matricule, nom, prenom, dateNais, categorie, sitFamille, sexe)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(data.matricule, data.nom, data.prenom, data.dateNais, data.categorie, data.sitFamille, data.sexe)
    return { success: true }
  })

  
  ipcMain.handle('assures:delete', (event, id) => {
    db.prepare('DELETE FROM assures WHERE id = ?').run(id)
    return { success: true }
  })

  ipcMain.handle('assures:update', (event, assure) => {
    db.prepare(`
      UPDATE assures
      SET matricule = ?, nom = ?, prenom = ?, dateNais = ?, categorie = ?, sitFamille = ?, sexe = ?
      WHERE id = ?
    `).run(assure.matricule, assure.nom, assure.dateNais, assure.categorie, assure.sitFamille, assure.sexe, assure.id)
    return { success: true }
  })
}