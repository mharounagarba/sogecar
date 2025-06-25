import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import './ClientsPage.css'
import ClientModal from './ClientModal'

export default function ClientsPage() {
  const [clients, setClients] = useState([])
  const [form, setForm] = useState({
    nom: '', contact: '', telephone: '', adresse: '', typeClient: 'Entreprise'
  })
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState(null)
const [selectedClient, setSelectedClient] = useState(null)

  const refresh = () => {
    window.api.getClients().then(setClients)
  }

  useEffect(() => { refresh() }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const client = { ...form, dateAjout: new Date().toISOString() }

    if (editingId) {
      await window.api.updateClient({ ...client, id: editingId })
      setEditingId(null)
    } else {
      await window.api.addClient(client)
    }

    setForm({ nom: '', contact: '', telephone: '', adresse: '', typeClient: 'Entreprise' })
    refresh()
  }

  const handleEdit = (client) => {
    setForm(client)
    setEditingId(client.id)
  }

  const handleDelete = async (id) => {
    if (confirm('Supprimer ce client ?')) {
      await window.api.deleteClient(id)
      refresh()
    }
  }

  const filtered = clients.filter(c =>
    c.nom.toLowerCase().includes(search.toLowerCase()) ||
    c.contact?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Layout>
      <h2>🏢 Gestion des clients</h2>

      <form onSubmit={handleSubmit} className="clients-form">
        <input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required />
        <input name="contact" placeholder="Contact" value={form.contact} onChange={handleChange} />
        <input name="telephone" placeholder="Téléphone" value={form.telephone} onChange={handleChange} />
        <input name="adresse" placeholder="Adresse" value={form.adresse} onChange={handleChange} />
        <select name="typeClient" value={form.typeClient} onChange={handleChange}>
          <option>Entreprise</option>
          <option>Particulier</option>
          <option>Institution</option>
        </select>
        <button type="submit" className="btn-primary">
          {editingId ? '💾 Mettre à jour' : '➕ Ajouter'}
        </button>
      </form>

      <input
        type="text"
        placeholder="🔍 Rechercher un client..."
        className="search-bar"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <table className="clients-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Contact</th>
            <th>Téléphone</th>
            <th>Adresse</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(c => (
            <tr key={c.id}>
              <td>{c.nom}</td>
              <td>{c.contact}</td>
              <td>{c.telephone}</td>
              <td>{c.adresse}</td>
              <td>{c.typeClient}</td>
              <td>
                <button onClick={() => handleEdit(c)}>✏️</button>
                <button onClick={() => handleDelete(c.id)} className="btn-delete">❌</button>
              
  <button onClick={() => setSelectedClient(c)}>👁️ Fiche</button>


              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedClient && (
  <ClientModal
    client={selectedClient}
    onClose={() => setSelectedClient(null)}
    onUpdate={(updated) => {
      window.api.updateClient(updated).then(() => {
        refreshClients()
        setSelectedClient(null)
      })
    }}
    onDelete={(id) => {
      if (confirm('❌ Supprimer ce client ?')) {
        window.api.deleteClient(id).then(() => {
          refreshClients()
          setSelectedClient(null)
        })
      }
    }}
  />
)}

    </Layout>
  )
}
