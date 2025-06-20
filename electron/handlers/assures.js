module.exports = (ipcMain, db) => {
  ipcMain.handle('assures:get', () => {
    return db.prepare('SELECT * FROM assures ORDER BY nom').all()
  })

  ipcMain.handle('assures:add', (e, data) => {
    db.prepare(`
      INSERT INTO assures (matricule, nom, prenom, dateNais, categorie, sitFamille, sexe)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(data.matricule, data.nom, data.prenom, data.dateNais, data.categorie, data.sitFamille, data.sexe)
    return { success: true }
  })
}
