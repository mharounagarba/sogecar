import { useState } from 'react'
import './AssureFormModal.css'

export default function AssureFormModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    matricule: '',
    nom: '',
    prenom: '',
    dateNais: '',
    sexe: 'M',
    sitFamille: 'Célibataire',
    categorie: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await window.api.addAssure(form)
    onSave(form.matricule)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>➕ Nouvel assuré</h3>
        <form onSubmit={handleSubmit} className="form-grid">
          <input name="matricule" placeholder="Matricule" value={form.matricule} onChange={handleChange} required />
          <input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required />
          <input name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} required />
          <input type="date" name="dateNais" value={form.dateNais} onChange={handleChange} />
          <select name="sexe" value={form.sexe} onChange={handleChange}>
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
          </select>
          <select name="sitFamille" value={form.sitFamille} onChange={handleChange}>
            <option value="Célibataire">Célibataire</option>
            <option value="Marié">Marié</option>
            <option value="Divorcé">Divorcé</option>
          </select>
          <input name="categorie" placeholder="Catégorie" value={form.categorie} onChange={handleChange} />
          <button type="submit" className="btn-primary">✅ Créer</button>
        </form>
        <button className="btn-cancel" onClick={onClose}>Annuler</button>
      </div>
    </div>
  )
}
