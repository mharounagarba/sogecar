import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, addUser, deleteUser, updateUser } from './usersSlice'

import UserModal from './UserModal'
import './CreateUser.css'
import Layout from '../../components/layout/Layout'


export default function CreateUser() {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users.list)
console.log(users);

  const [form, setForm] = useState({ username: '', password: '', role: 'agent' })
const [filter, setFilter] = useState('')
const [editingUser, setEditingUser] = useState(null)

const filteredUsers = users.filter(u =>
  u.username.toLowerCase().includes(filter.toLowerCase()) ||
  u.role.toLowerCase().includes(filter.toLowerCase())
)

const handleUpdateUser = (updatedUser) => {
 dispatch(updateUser(updatedUser))}

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(addUser(form))
    setForm({ username: '', password: '', role: 'agent' })
  }

  return (
    <Layout>
      <h2>👥 Gestion des utilisateurs</h2>

      <form onSubmit={handleSubmit} className="user-form">
        <input name="username" placeholder="Nom d'utilisateur" value={form.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Mot de passe" value={form.password} onChange={handleChange} required />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="admin">Admin</option>
          <option value="agent">Agent</option>
          <option value="viewer">Viewer</option>
        </select>
        <button type="submit">➕ Créer</button>
      </form>

      <input
  type="text"
  placeholder="🔍 Rechercher un utilisateur..."
  value={filter}
  onChange={e => setFilter(e.target.value)}
  style={{ marginBottom: '1rem', padding: '0.5rem', borderRadius: 8, border: '1px solid #ccc' }}
/>

<table className="users-table">
  <thead>
    <tr>
      <th>Nom</th><th>Rôle</th><th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {filteredUsers.map(u => (
      <tr key={u.id}>
        <td>{u.username}</td>
        <td>{u.role}</td>
        <td>
          <button onClick={() => setEditingUser(u)}>✏️</button>
          <button onClick={() => dispatch(deleteUser(u.id))}>❌</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

{editingUser && (
  <UserModal
    user={editingUser}
    onClose={() => setEditingUser(null)}
    onUpdate={handleUpdateUser}
  />
)}

    </Layout>
  )
}
