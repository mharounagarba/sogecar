module.exports = (ipcMain, db) => {
  // Récupérer toutes les assurances
  ipcMain.handle('assurances:get', () => {
    return db.prepare('SELECT * FROM assurances ORDER BY date_saisie DESC').all()
  })
// Récupérer une 
 ipcMain.handle('assurances:getById', (e, id) => {
    const stmt = db.prepare('SELECT * FROM assurances WHERE id = ?')
    return stmt.get(id)
  })
  // Ajouter une nouvelle assurance
  ipcMain.handle('assurances:add', (e, data) => {
    const stmt = db.prepare(`
      INSERT INTO assurances (
        nordre, nCarton, nAssure, nPolice, souscripteur, profession,
        adresse, echeance, validite_du, validite_au, prise_effet, genre,
        marque, immat_moteur, categorie_usage, expirer,
        date_saisie, qui_saisie, assureur, prime_ttc
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    stmt.run(
      data.nordre, data.nCarton, data.nAssure, data.nPolice, data.souscripteur,
      data.profession, data.adresse, data.echeance, data.validite_du, data.validite_au,
      data.prise_effet, data.genre, data.marque, data.immat_moteur, data.categorie_usage,
      data.expirer ? 1 : 0, data.date_saisie, data.qui_saisie, data.assureur, data.prime_ttc
    )
    return { success: true }
  })

  // Mettre à jour une assurance
  ipcMain.handle('assurances:update', (e, data) => {
    const stmt = db.prepare(`
      UPDATE assurances SET
        nordre = ?, nCarton = ?, nAssure = ?, nPolice = ?, souscripteur = ?, profession = ?,
        adresse = ?, echeance = ?, validite_du = ?, validite_au = ?, prise_effet = ?, genre = ?,
        marque = ?, immat_moteur = ?, categorie_usage = ?, expirer = ?,
        date_saisie = ?, qui_saisie = ?, assureur = ?, prime_ttc = ?
      WHERE id = ?
    `)
    stmt.run(
      data.nordre, data.nCarton, data.nAssure, data.nPolice, data.souscripteur,
      data.profession, data.adresse, data.echeance, data.validite_du, data.validite_au,
      data.prise_effet, data.genre, data.marque, data.immat_moteur, data.categorie_usage,
      data.expirer ? 1 : 0, data.date_saisie, data.qui_saisie, data.assureur, data.prime_ttc,
      data.id
    )
    return { success: true }
  })

  // Supprimer une assurance
  ipcMain.handle('assurances:delete', (e, id) => {
    db.prepare('DELETE FROM assurances WHERE id = ?').run(id)
    return { success: true }
  })
}
