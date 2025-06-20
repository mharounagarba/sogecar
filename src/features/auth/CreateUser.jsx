import { useState } from 'react'
import { useSelector } from 'react-redux'
import './CreateUser.css'

export default function CreateUser() {
  const { role } = useSelector(state => state.auth)
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: 'user'
  })
  const [message, setMessage] = useState('')

  if (role !== 'admin') return null

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await window.api.createUser(form)
    setMessage(res.message)
    if (res.success) {
      setForm({ username: '', password: '', role: 'user' })
    }
  }

  return (
    <form className="create-user-form" onSubmit={handleSubmit}>
      <h3>Créer un nouvel utilisateur</h3>
      <label>Nom d'utilisateur</label>
      <input name="username" value={form.username} onChange={handleChange} required />

      <label>Mot de passe</label>
      <input type="password" name="password" value={form.password} onChange={handleChange} required />

      <label>Rôle</label>
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="user">Utilisateur</option>
        <option value="viewer">Lecteur</option>
        <option value="admin">Administrateur</option>
      </select>

      <button type="submit">Créer</button>
      {message && <p className="feedback">{message}</p>}
    </form>
  )
}
