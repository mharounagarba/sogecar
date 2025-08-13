module.exports = (ipcMain, db) => {
  ipcMain.handle('clients:get', () => {
    return db.prepare('SELECT * FROM clients ORDER BY nom').all()
  })
// Récupérer une 
 ipcMain.handle('clients:getById', (e, id) => {
    const stmt = db.prepare('SELECT * FROM clients WHERE id = ?')
    return stmt.get(id)
  })
  ipcMain.handle('clients:add', (e, client) => {
    db.prepare(`
      INSERT INTO clients (nom, contact, telephone, adresse, typeClient, dateAjout)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(client.nom, client.contact, client.telephone, client.adresse, client.typeClient, client.dateAjout)
    return { success: true }
  })

  ipcMain.handle('clients:update', (e, client) => {
    db.prepare(`
      UPDATE clients SET nom=?, contact=?, telephone=?, adresse=?, typeClient=?
      WHERE id=?
    `).run(client.nom, client.contact, client.telephone, client.adresse, client.typeClient, client.id)
    return { success: true }
  })

  ipcMain.handle('clients:delete', (e, id) => {
    db.prepare('DELETE FROM clients WHERE id = ?').run(id)
    return { success: true }
  })
}
