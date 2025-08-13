import { useState } from 'react'
import './FicheBeneficiaireModal.css'

export default function FicheBeneficiaireModal({ beneficiaire, onClose, onUpdate, onDelete }) {
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({ ...beneficiaire })

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    onUpdate(form)
    setEditMode(false)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>✖</button>
        <h2>👤 Fiche bénéficiaire</h2>
        {editMode ? (
          <>
            <input name="nom" value={form.nom} onChange={handleChange} placeholder="Nom" />
            <input name="prenom" value={form.prenom} onChange={handleChange} placeholder="Prénom" />
            <input type="date" name="dateNais" value={form.dateNais} onChange={handleChange} />
            <input name="lienFamille" value={form.lienFamille} onChange={handleChange} placeholder="Lien familial" />
            <div className="modal-actions">
              <button className="btn-primary" onClick={handleSave}>💾 Enregistrer</button>
              <button onClick={() => setEditMode(false)}>❌ Annuler</button>
            </div>
          </>
        ) : (
          <>
            <p><strong>Nom :</strong> {form.nom}</p>
            <p><strong>Prénom :</strong> {form.prenom}</p>
            <p><strong>Date naissance :</strong> {form.dateNais}</p>
            <p><strong>Lien :</strong> {form.lienFamille}</p>
            <div className="modal-actions">
              <button onClick={() => setEditMode(true)}>✏️ Modifier</button>
              <button className="btn-delete" onClick={() => {
                if (confirm('❗ Supprimer ce bénéficiaire ?')) {
                  onDelete(form.id)
                }
              }}>🗑️ Supprimer</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
