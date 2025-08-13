import { useState, useMemo } from 'react'
import './ListeAssures.css'

export default function ListeAssures({ assures, onSelect }) {
  const [search, setSearch] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'nom', direction: 'asc' })
  const [page, setPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  const filtered = assures.filter(a =>
    a.nom.toLowerCase().includes(search.toLowerCase()) ||
    a.prenom.toLowerCase().includes(search.toLowerCase()) ||
    a.matricule.toLowerCase().includes(search.toLowerCase()) ||
    (a.categorie || '').toLowerCase().includes(search.toLowerCase()) ||
    (a.client || '').toLowerCase().includes(search.toLowerCase())
  )

  const sorted = useMemo(() => {
    const sortedList = [...filtered]
    sortedList.sort((a, b) => {
      const aVal = a[sortConfig.key]?.toLowerCase?.() || ''
      const bVal = b[sortConfig.key]?.toLowerCase?.() || ''
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
    return sortedList
  }, [filtered, sortConfig])

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE)
  const paginated = sorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const toggleSort = (key) => {
    setSortConfig(prev =>
      prev.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' }
    )
  }

  return (
    <div className="liste-assures-container">
      <h2>📄 Liste des assurés</h2>

      <input
        type="text"
        placeholder="🔎 Rechercher un assuré..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          setPage(1) // reset page à chaque recherche
        }}
        className="search-bar"
      />

      <p className="results-count">Résultats : {filtered.length} assuré(s)</p>

      <table className="assures-table">
        <thead>
          <tr>
            <th onClick={() => toggleSort('matricule')}>Matricule ⬍</th>
            <th onClick={() => toggleSort('nom')}>Nom ⬍</th>
            <th onClick={() => toggleSort('prenom')}>Prénom ⬍</th>
            <th onClick={() => toggleSort('categorie')}>Catégorie ⬍</th>
            <th onClick={() => toggleSort('client')}>Client ⬍</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((assure) => (
            <tr key={assure.id}>
              <td>{assure.matricule}</td>
              <td>{assure.nom}</td>
              <td>{assure.prenom}</td>
              <td>{assure.categorie}</td>
              <td>{assure.client}</td>
              <td>
                <button onClick={() => onSelect?.(assure.matricule)}>
                  👁️ Voir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Précédent</button>
        <span>Page {page} / {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Suivant →</button>
      </div>
    </div>
  )
}
