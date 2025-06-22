import { useState } from 'react'
import dayjs from 'dayjs'
import './ActeForm.css'

export default function ActeForm({ onSuccess }) {
  const [form, setForm] = useState({
    type: '',
    centre: '',
    typePEC: '',
    montant: '',
    date: dayjs().format('YYYY-MM-DD'),
    matricule: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await window.api.addActe({ ...form, montant: parseFloat(form.montant) })
    onSuccess?.()
    alert('✅ Acte ajouté avec succès')
  }

  return (
    <form onSubmit={handleSubmit} className="acte-form">
      <h3>➕ Ajouter un acte</h3>
      <div className="acte-form-fields">
        <input name="type" value={form.type} onChange={handleChange} placeholder="Type" required />
        <input name="centre" value={form.centre} onChange={handleChange} placeholder="Centre" required />
        <input name="typePEC" value={form.typePEC} onChange={handleChange} placeholder="Type PEC" required />
        <input name="montant" type="number" value={form.montant} onChange={handleChange} placeholder="Montant" required />
        <input name="date" type="date" value={form.date} onChange={handleChange} />
        <input name="matricule" value={form.matricule} onChange={handleChange} placeholder="Matricule bénéficiaire" required />
      </div>
      <button type="submit">💾 Enregistrer</button>
    </form>
  )
}
