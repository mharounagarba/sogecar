module.exports = (ipcMain, db) => {
  ipcMain.handle('centres:get', () => {
    return db.prepare('SELECT * FROM centres ORDER BY nom').all()
  })

  ipcMain.handle('centres:add', (e, data) => {
    const stmt = db.prepare(`
      INSERT INTO centres (nom, type, convention, adresse, ville, contact)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
    stmt.run(data.nom, data.type, data.convention ? 1 : 0, data.adresse, data.ville, data.contact)
    return { success: true }
  })

  ipcMain.handle('centres:update', (e, data) => {
    const stmt = db.prepare(`
      UPDATE centres SET nom = ?, type = ?, convention = ?, adresse = ?, ville = ?, contact = ?
      WHERE id = ?
    `)
    stmt.run(data.nom, data.type, data.convention ? 1 : 0, data.adresse, data.ville, data.contact, data.id)
    return { success: true }
  })

  ipcMain.handle('centres:delete', (e, id) => {
    db.prepare('DELETE FROM centres WHERE id = ?').run(id)
    return { success: true }
  })
}
