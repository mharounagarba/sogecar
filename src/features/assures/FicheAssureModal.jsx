import { useState } from 'react'
import './FicheAssureModal.css'

export default function FicheAssureModal({ assure, onClose, onUpdate, onDelete }) {
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({ ...assure })

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
        <h2>👤 Fiche Assuré</h2>
        {editMode ? (
          <>
            <input name="nom" value={form.nom} onChange={handleChange} placeholder="Nom" />
            <input name="prenom" value={form.prenom} onChange={handleChange} placeholder="Prénom" />
            <input type="date" name="dateNais" value={form.dateNais} onChange={handleChange} />
            <select name="sexe" value={form.sexe} onChange={handleChange}>
              <option value="M">Masculin</option>
              <option value="F">Féminin</option>
            </select>
            <select name="sitFamille" value={form.sitFamille} onChange={handleChange}>
              <option>Célibataire</option>
              <option>Marié</option>
              <option>Divorcé</option>
            </select>
            <input name="categorie" value={form.categorie} onChange={handleChange} placeholder="Catégorie" />
            <input name="client" value={form.client} onChange={handleChange} placeholder="Client" />
            <div className="modal-actions">
              <button className="btn-primary" onClick={handleSave}>💾 Sauvegarder</button>
              <button onClick={() => setEditMode(false)}>❌ Annuler</button>
            </div>
          </>
        ) : (
          <>
            <p><strong>Matricule :</strong> {form.matricule}</p>
            <p><strong>Nom :</strong> {form.nom}</p>
            <p><strong>Prénom :</strong> {form.prenom}</p>
            <p><strong>Naissance :</strong> {form.dateNais}</p>
            <p><strong>Sexe :</strong> {form.sexe}</p>
            <p><strong>Situation familiale :</strong> {form.sitFamille}</p>
            <p><strong>Catégorie :</strong> {form.categorie}</p>
            <p><strong>Client :</strong> {form.client}</p>
            <div className="modal-actions">
              <button onClick={() => setEditMode(true)}>✏️ Modifier</button>
              <button className="btn-delete" onClick={() => {
                if (confirm('❗ Supprimer cet assuré ?')) onDelete(form.id)
              }}>🗑️ Supprimer</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
