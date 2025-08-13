import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { FaEllipsisV, FaTrashAlt, FaPen, FaFilePdf, FaEye } from 'react-icons/fa'
// import './AssurancesTable.css'

export default function AssurancesTable({
  data, search, sort, setSort, currentPage, setCurrentPage,
  onDelete, onExportPDF, onView
}) {
  const navigate = useNavigate()
  const itemsPerPage = 10
  const [dropdownOpenId, setDropdownOpenId] = useState(null)
  const [dropdownDirection, setDropdownDirection] = useState('bottom')
  const dropdownRefs = useRef({})

  // Fermeture au clic en dehors
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!Object.values(dropdownRefs.current).some(ref => ref?.contains(e.target))) {
        setDropdownOpenId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filtered = data.filter(a =>
    a.nPolice?.toLowerCase().includes(search.toLowerCase()) ||
    a.souscripteur?.toLowerCase().includes(search.toLowerCase()) ||
    a.marque?.toLowerCase().includes(search.toLowerCase())
  )

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sort.key]
    const bVal = b[sort.key]
    if (aVal < bVal) return sort.order === 'asc' ? -1 : 1
    if (aVal > bVal) return sort.order === 'asc' ? 1 : -1
    return 0
  })

  const paginated = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(sorted.length / itemsPerPage)

  const toggleSort = key => {
    setSort(prev => ({
      key,
      order: prev.key === key && prev.order === 'asc' ? 'desc' : 'asc'
    }))
  }

  const sortArrow = key =>
    sort.key === key ? (sort.order === 'asc' ? '↑' : '↓') : '⇅'

  const toggleDropdown = (id, e) => {
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    console.log(spaceBelow);
    
    setDropdownDirection(spaceBelow < 200 ? 'top' : 'bottom')
    setDropdownOpenId(dropdownOpenId === id ? null : id)
  }

  return (
    <div className="material-table-wrapper">
      <table className="material-table">
        <thead>
          <tr>
            <th onClick={() => toggleSort('nPolice')}>Police {sortArrow('nPolice')}</th>
            <th onClick={() => toggleSort('souscripteur')}>Souscripteur {sortArrow('souscripteur')}</th>
            <th onClick={() => toggleSort('marque')}>Marque {sortArrow('marque')}</th>
            <th onClick={() => toggleSort('prime_ttc')}>Prime TTC {sortArrow('prime_ttc')}</th>
            <th>Validité</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {paginated.map(a => (
            <tr key={a.id}>
              <td>{a.nPolice}</td>
              <td>{a.souscripteur}</td>
              <td>{a.marque}</td>
              <td>{a.prime_ttc?.toLocaleString()} FCFA</td>
              <td>{a.validite_du} → {a.validite_au}</td>
              <td className="dropdown-cell">
                <div className="dropdown-wrapper" ref={el => dropdownRefs.current[a.id] = el}>
                  <button className="menu-btn" onClick={(e) => toggleDropdown(a.id, e)}>
                    <FaEllipsisV />
                  </button>
                  {dropdownOpenId === a.id && (
                    <div className={`dropdown-menu ${dropdownDirection === 'top' ? 'top' : ''}`}>
                      <button onClick={() => navigate(`/assurances/${a.id}/update`)}><FaPen /> Modifier</button>
                      <button onClick={() => onView?.(a)}><FaEye /> Voir</button>
                      <button onClick={() => onDelete(a.id)}><FaTrashAlt /> Supprimer</button>
                      <button onClick={() => onExportPDF(a)}><FaFilePdf /> Exporter PDF</button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>⏮️</button>
        <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}>◀️</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} className={i + 1 === currentPage ? 'active' : ''} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
        ))}
        <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}>▶️</button>
        <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>⏭️</button>
      </div>
    </div>
  )
}
