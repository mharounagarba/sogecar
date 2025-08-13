import { useState, useEffect } from 'react'

export default function ActeEditForm({ acte, onCancel, onSave }) {
  const [form, setForm] = useState({ ...acte })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await window.api.updateActe({ ...form, montant: parseFloat(form.montant) })
    alert('✅ Acte mis à jour')
    onSave?.()
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <h3>✏️ Modifier un acte</h3>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <input name="type" value={form.type} onChange={handleChange} placeholder="Type" required />
        <input name="centre" value={form.centre} onChange={handleChange} placeholder="Centre" required />
        <input name="typePEC" value={form.typePEC} onChange={handleChange} placeholder="Type PEC" required />
        <input name="montant" type="number" value={form.montant} onChange={handleChange} placeholder="Montant" required />
        <input name="date" type="date" value={form.date} onChange={handleChange} />
        <input name="matricule" value={form.matricule} onChange={handleChange} placeholder="Matricule" required />
      </div>
      <button type="submit">💾 Enregistrer</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>❌ Annuler</button>
    </form>
  )
}
