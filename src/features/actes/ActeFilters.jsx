import { useState, useEffect } from 'react'
import dayjs from 'dayjs'

export default function ActeFilters({ actes, onFilter }) {
  const [mois, setMois] = useState('')
  const [centre, setCentre] = useState('')
  const [typePEC, setTypePEC] = useState('')

  // Extraire listes uniques
  const centres = [...new Set(actes.map(a => a.centre))].sort()
  const types = [...new Set(actes.map(a => a.typePEC))].sort()

  const handleFilter = () => {
    const filtered = actes.filter(a => {
      const matchMois = mois ? dayjs(a.date).format('YYYY-MM') === mois : true
      const matchCentre = centre ? a.centre === centre : true
      const matchPEC = typePEC ? a.typePEC === typePEC : true
      return matchMois && matchCentre && matchPEC
    })
    onFilter(filtered)
  }

  useEffect(() => {
    handleFilter()
  }, [mois, centre, typePEC])

  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
      <select onChange={e => setMois(e.target.value)} defaultValue="">
        <option value="">📅 Tous les mois</option>
        {[...new Set(actes.map(a => dayjs(a.date).format('YYYY-MM')))].sort().map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      <select onChange={e => setCentre(e.target.value)} defaultValue="">
        <option value="">🏥 Tous les centres</option>
        {centres.map(c => <option key={c}>{c}</option>)}
      </select>

      <select onChange={e => setTypePEC(e.target.value)} defaultValue="">
        <option value="">🧾 Tous les types PEC</option>
        {types.map(t => <option key={t}>{t}</option>)}
      </select>
    </div>
  )
}
