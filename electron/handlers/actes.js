module.exports = (ipcMain, db) => {
  ipcMain.handle('actes:get', () => {
    return db.prepare('SELECT * FROM actes ORDER BY date DESC').all()
  })
// Récupérer une 
 ipcMain.handle('actes:getById', (e, id) => {
    const stmt = db.prepare('SELECT * FROM actes WHERE id = ?')
    return stmt.get(id)
  })

  ipcMain.handle('actes:add', (event, acte) => {
    db.prepare(`
      INSERT INTO actes (type, centre, typePEC, montant, date, matricule)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(acte.type, acte.centre, acte.typePEC, acte.montant, acte.date, acte.matricule)
    return { success: true }
  })

  ipcMain.handle('actes:delete', (event, id) => {
    db.prepare('DELETE FROM actes WHERE id = ?').run(id)
    return { success: true }
  })

  ipcMain.handle('actes:update', (event, acte) => {
    db.prepare(`
      UPDATE actes
      SET type = ?, centre = ?, typePEC = ?, montant = ?, date = ?, matricule = ?
      WHERE id = ?
    `).run(acte.type, acte.centre, acte.typePEC, acte.montant, acte.date, acte.matricule, acte.id)
    return { success: true }
  })
}
