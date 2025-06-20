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

  ipcMain.handle('user:create', (event, userData) => {
    const { username, password, role } = userData
    if (!username || !password || !role) return { success: false, message: 'Champs manquants' }

    const hash = bcrypt.hashSync(password, 10)
    try {
      db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)').run(username, hash, role)
      return { success: true, message: 'Utilisateur créé ✅' }
    } catch (err) {
      return { success: false, message: 'Utilisateur déjà existant ou erreur' }
    }
  })
}
