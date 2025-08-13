import { useState } from 'react'
import './FicheBeneficiaire.css'

export default function FicheBeneficiaire({ beneficiaire, onUpdate, onDelete }) {
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({ ...beneficiaire })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(form)
    } else {
      window.api.updateBeneficiaire(form)
    }
    setEditMode(false)
  }

  const handleDelete = () => {
    if (confirm('🗑️ Supprimer ce bénéficiaire ?')) {
      if (onDelete) {
        onDelete(form.id)
      } else {
        window.api.deleteBeneficiaire(form.id)
      }
    }
  }

  return (
    <div className="fiche-beneficiaire">
      <h3>👤 Détail du bénéficiaire</h3>
      {editMode ? (
        <div className="fiche-fields">
          <input name="nom" value={form.nom} onChange={handleChange} placeholder="Nom" />
          <input name="prenom" value={form.prenom} onChange={handleChange} placeholder="Prénom" />
          <input type="date" name="dateNais" value={form.dateNais} onChange={handleChange} />
          <select name="lienFamille" value={form.lienFamille} onChange={handleChange}>
            <option value="Enfant">Enfant</option>
            <option value="Conjoint">Conjoint</option>
            <option value="Parent">Parent</option>
          </select>

          <div className="fiche-buttons">
            <button onClick={handleSave}>💾 Sauvegarder</button>
            <button onClick={() => setEditMode(false)}>❌ Annuler</button>
          </div>
        </div>
      ) : (
        <div className="fiche-infos">
          <p><strong>Nom :</strong> {form.nom}</p>
          <p><strong>Prénom :</strong> {form.prenom}</p>
          <p><strong>Date de naissance :</strong> {form.dateNais}</p>
          <p><strong>Lien familial :</strong> {form.lienFamille}</p>

          <div className="fiche-buttons">
            <button onClick={() => setEditMode(true)}>✏️ Modifier</button>
            <button onClick={handleDelete}>🗑️ Supprimer</button>
          </div>
        </div>
      )}
    </div>
  )
}
