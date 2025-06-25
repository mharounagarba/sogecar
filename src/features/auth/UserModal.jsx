import { useState } from 'react'

export default function UserModal({ user, onClose, onUpdate }) {
  const [form, setForm] = useState(user)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdate(form)
    onClose()
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>✏️ Modifier l'utilisateur</h3>
        <form onSubmit={handleSubmit}>
          <input name="username" value={form.username} onChange={handleChange} />
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="admin">Admin</option>
            <option value="agent">Agent</option>
            <option value="viewer">Viewer</option>
          </select>
          <button type="submit">💾 Sauvegarder</button>
        </form>
        <button onClick={onClose}>❌ Fermer</button>
      </div>
    </div>
  )
}
