import { useEffect, useState } from 'react'
import './AssureSelect.css'

export default function AssureSelect({ value, onChange }) {
  const [assures, setAssures] = useState([])
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    window.api.getAssures().then(setAssures)
  }, [])

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
        value={query || value}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        placeholder="🔍 Rechercher assuré (nom ou matricule)"
      />
      {open && filtered.length > 0 && (
        <ul className="assure-dropdown">
          {filtered.map((a) => (
            <li key={a.matricule} onClick={() => handleSelect(a.matricule)}>
              {a.nom} {a.prenom} — <strong>{a.matricule}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
