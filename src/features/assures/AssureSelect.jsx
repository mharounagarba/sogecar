import { useEffect, useState } from 'react'
import AssureFormModal from './AssureFormModal'

import './AssureSelect.css'

export default function AssureSelect({ value, onChange }) {
  const [showForm, setShowForm] = useState(false)

  const [assures, setAssures] = useState([])
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [selectedAssure, setSelectedAssure] = useState(null)
  const [beneficiaires, setBeneficiaires] = useState([])

  useEffect(() => {
    window.api.getAssures().then(setAssures)
  }, [])

useEffect(() => {
  const found = assures.find(a => a.matricule === value)
  setSelectedAssure(found)

  if (found) {
    setQuery(`${found.nom} ${found.prenom} (${found.matricule})`)
    window.api.getBeneficiaires(value).then(setBeneficiaires)
  } else {
    setQuery('')
    setBeneficiaires([])
    setSelectedAssure(null)
  }
}, [value])

  const filtered = assures.filter(a =>
    `${a.nom} ${a.prenom} ${a.matricule}`.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (matricule) => {
    onChange(matricule)
    setQuery('')
    setOpen(false)
  }

  return (
    <div className="assure-select">
  <input
  type="text"
  value={query}
  onChange={(e) => {
    setQuery(e.target.value)
    setOpen(true)
    onChange('') // Réinitialise le matricule lié si on modifie le champ
  }}
  onFocus={() => setOpen(true)}
  placeholder="🔍 Nom ou matricule"
/>

      {open && filtered.length > 0 && (
        <ul className="assure-dropdown">
          {filtered.map((a) => (
            <li key={a.matricule} onClick={() => handleSelect(a.matricule)}>
              {a.nom} {a.prenom} — <strong>{a.matricule}</strong>
            </li>
          ))}
          <li className="add-new" onClick={() => {
  setOpen(false)
  setShowForm(true)
}}>
  ➕ Ajouter un nouvel assuré
</li>

        </ul>
      )}

      {selectedAssure && (
        <div className="assure-details">
          <h4>👤 Assuré sélectionné</h4>
          <p><strong>{selectedAssure.nom} {selectedAssure.prenom}</strong></p>
          <p><small>Catégorie : {selectedAssure.categorie} | Sexe : {selectedAssure.sexe}</small></p>
          <p><small>Situation : {selectedAssure.sitFamille} | Né(e) le : {selectedAssure.dateNais}</small></p>

          {beneficiaires.length > 0 && (
            <>
              <h5>👨‍👩‍👧 Bénéficiaires</h5>
              <ul>
                {beneficiaires.map(b => (
                  <li key={b.id}>
                    {b.nom} {b.prenom} — {b.lienFamille} — {b.dateNais}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      {showForm && (
  <AssureFormModal
    onClose={() => setShowForm(false)}
    onSave={(matricule) => onChange(matricule)}
  />
)}

    </div>
  )
}
