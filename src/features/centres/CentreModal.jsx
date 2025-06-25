import { useState } from 'react'
import './CentreModal.css'

export default function CentreModal({ centre, onClose }) {
  const [form, setForm] = useState({
    nom: '', type: '', convention: false,
    adresse: '', ville: '', contact: '',
    ...centre
  })

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSave = async () => {
    if (form.id) await window.api.updateCentre(form)
    else await window.api.addCentre(form)
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal-centre">
        <button onClick={onClose} className="close-button">×</button>
        <h3>{form.id ? '✏️ Modifier le centre' : '➕ Nouveau centre'}</h3>
        
        <input name="nom" value={form.nom} onChange={handleChange} placeholder="Nom du centre" />
        <input name="type" value={form.type} onChange={handleChange} placeholder="Type (Hôpital, Clinique...)" />
        
        <label className="checkbox-row">
          <input
            type="checkbox"
            name="convention"
            checked={form.convention}
            onChange={handleChange}
          />
          Conventionné
        </label>
        
        <input name="adresse" value={form.adresse} onChange={handleChange} placeholder="Adresse complète" />
        <input name="ville" value={form.ville} onChange={handleChange} placeholder="Ville" />
        <input name="contact" value={form.contact} onChange={handleChange} placeholder="Téléphone / Email" />
        
        <div className="modal-buttons">
          <button className="btn-primary" onClick={handleSave}>💾 Enregistrer</button>
          <button className="btn-secondary" onClick={onClose}>❌ Annuler</button>
        </div>
      </div>
    </div>
  )
}
