import { useNavigate } from 'react-router-dom'
import './ClientModal.css'
import { useState } from 'react'

export default function ClientModal({ client, onClose, onUpdate, onDelete }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ ...client })
  const [editMode, setEditMode] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    onUpdate(form)
    setEditMode(false)
  }

  return (
    <div className="modal-overlay">
      <div className="client-modal">
        <div className="modal-header">
          <h2>👤 Fiche client</h2>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        {editMode ? (
          <>
            <input name="nom" value={form.nom} onChange={handleChange} placeholder="Nom" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
            <input name="telephone" value={form.telephone} onChange={handleChange} placeholder="Téléphone" />
            <textarea name="adresse" value={form.adresse} onChange={handleChange} placeholder="Adresse" />
            <div className="modal-actions">
              <button className="btn-primary" onClick={handleSave}>💾 Sauvegarder</button>
              <button onClick={() => setEditMode(false)}>❌ Annuler</button>
            </div>
          </>
        ) : (
          <>
            <p><strong>Nom :</strong> {client.nom}</p>
            <p><strong>Email :</strong> {client.email}</p>
            <p><strong>Téléphone :</strong> {client.telephone}</p>
            <p><strong>Adresse :</strong> {client.adresse}</p>

            <div className="modal-actions">
              <button onClick={() => navigate(`/clients/${client.id}`)}>
  📁 Voir les assurés liés
</button>
              <button onClick={() => setEditMode(true)}>✏️ Modifier</button>
              <button className="btn-delete" onClick={() => {
                if (confirm('❗ Supprimer ce client ?')) onDelete(client.id)
              }}>🗑️ Supprimer</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
