import { useState, useEffect } from 'react'
import './ActeFormModal.css'
import AssureSelect from '../assures/AssureSelect'

export default function ActeFormModal({ acte, onClose, onSave }) {
  const [form, setForm] = useState({
    type: '',
    centre: '',
    typePEC: 'Mutuelle',
    montant: '',
    date: new Date().toISOString().slice(0, 10),
    matricule: ''
  })

  useEffect(() => {
    if (acte) {
      setForm({
        ...acte,
        date: acte.date?.slice(0, 10)
      })
    }
  }, [acte])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = { ...form, montant: parseFloat(form.montant) }
    if (!payload.date) payload.date = new Date().toISOString()
    onSave(payload)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content acte-form-modal" onClick={e => e.stopPropagation()}>
        <h3>{acte ? '✏️ Modifier un acte' : '➕ Ajouter un acte'}</h3>
        <form onSubmit={handleSubmit} className="form-grid">
          <input name="type" value={form.type} onChange={handleChange} placeholder="Type d'acte" required />
          <input name="centre" value={form.centre} onChange={handleChange} placeholder="Centre médical" required />
          <select name="typePEC" value={form.typePEC} onChange={handleChange}>
            <option value="Mutuelle">Mutuelle</option>
            <option value="Société">Société</option>
            <option value="Agent">Agent</option>
          </select>
          <input type="number" name="montant" value={form.montant} onChange={handleChange} placeholder="Montant (FCFA)" required />
          <input type="date" name="date" value={form.date} onChange={handleChange} />
          <AssureSelect
  value={form.matricule}
  onChange={(matricule) => setForm(prev => ({ ...prev, matricule }))}
/>
          <button type="submit" className="btn-primary">{acte ? '💾 Enregistrer' : '➕ Ajouter'}</button>
        </form>
        <button className="btn-cancel" onClick={onClose}>❌ Annuler</button>
      </div>
    </div>
  )
}
