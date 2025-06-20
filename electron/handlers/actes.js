module.exports = (ipcMain, db) => {
  ipcMain.handle('actes:get', () => {
    return db.prepare('SELECT * FROM actes ORDER BY date DESC').all()
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
}
