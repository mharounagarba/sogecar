const bcrypt = require('bcryptjs')

module.exports = (ipcMain, db) => {
  ipcMain.handle('user:login', (event, username, password) => {
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username)
    if (!user) return { success: false, error: 'Utilisateur inconnu' }

    const valid = bcrypt.compareSync(password, user.password)
    return valid
      ? { success: true, user: { username: user.username, role: user.role } }
      : { success: false, error: 'Mot de passe invalide' }
  })

 ipcMain.handle('getUsers', () => {
    return db.prepare('SELECT id, username, role FROM users').all()
  })

  ipcMain.handle('user:create', (e, user) => {
    const hash = bcrypt.hashSync(user.password, 10)
    const stmt = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)')
    const info = stmt.run(user.username, hash, user.role)
    return { id: info.lastInsertRowid, username: user.username, role: user.role }
  })
ipcMain.handle('user:update', (e, user) => {
  const stmt = db.prepare('UPDATE users SET username = ?, role = ? WHERE id = ?')
  stmt.run(user.username, user.role, user.id)
  return { id: user.id, username: user.username, role: user.role }
})


  ipcMain.handle('user:delete', (e, id) => {
    db.prepare('DELETE FROM users WHERE id = ?').run(id)
  })

}
