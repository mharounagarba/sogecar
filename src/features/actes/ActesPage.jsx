import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchActes, addActe, deleteActe } from './actesSlice'
import Layout from '../../components/Layout'
import { exportActesToExcel } from '../../utils/exportExcel'
import { exportActesToPDF } from '../../utils/exportActesPDF'
import ActeModal from './ActeModal'
import ActeFormModal from './ActeFormModal'
import './ActesPage.css'

export default function ActesPage() {
  const dispatch = useDispatch()
  const actes = useSelector(state => state.actes.list)

  const [modalActe, setModalActe] = useState(null)
  const [selectedActe, setSelectedActe] = useState(null)

  const [form, setForm] = useState({
    type: '', centre: '', typePEC: 'Mutuelle', montant: '', matricule: ''
  })

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState({ key: 'date', order: 'desc' })
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    dispatch(fetchActes())
  }, [dispatch])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(addActe({ ...form, montant: parseFloat(form.montant), date: new Date().toISOString() }))
    setForm({ type: '', centre: '', typePEC: 'Mutuelle', montant: '', matricule: '' })
  }

  const filtered = actes.filter(a => {
    const matchSearch =
      a.type?.toLowerCase().includes(search.toLowerCase()) ||
      a.centre?.toLowerCase().includes(search.toLowerCase()) ||
      a.matricule?.toLowerCase().includes(search.toLowerCase())

    const date = new Date(a.date)
    const inStart = startDate ? date >= new Date(startDate) : true
    const inEnd = endDate ? date <= new Date(endDate) : true

    return matchSearch && inStart && inEnd
  })

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sort.key]
    const bVal = b[sort.key]
    if (aVal < bVal) return sort.order === 'asc' ? -1 : 1
    if (aVal > bVal) return sort.order === 'asc' ? 1 : -1
    return 0
  })

  const totalPages = Math.ceil(sorted.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = sorted.slice(indexOfFirstItem, indexOfLastItem)

  const totalMontant = filtered.reduce((sum, a) => sum + a.montant, 0)
  const nbActes = filtered.length
  const moyenne = nbActes > 0 ? totalMontant / nbActes : 0

  const toggleSort = (key) => {
    setSort(prev => ({
      key,
      order: prev.key === key && prev.order === 'asc' ? 'desc' : 'asc'
    }))
  }

  return (
    <Layout>
      <div className="actes-container">
        <h2>📄 Actes médicaux</h2>
        <button onClick={() => setModalActe({})} className="btn-primary">➕ Ajouter un acte</button>

        <form className="acte-form-modern" onSubmit={handleSubmit}>
          <input name="type" placeholder="Type d'acte" value={form.type} onChange={handleChange} required />
          <input name="centre" placeholder="Centre" value={form.centre} onChange={handleChange} required />
          <select name="typePEC" value={form.typePEC} onChange={handleChange}>
            <option value="Mutuelle">Mutuelle</option>
            <option value="Société">Société</option>
            <option value="Agent">Agent</option>
          </select>
          <input type="number" name="montant" placeholder="Montant" value={form.montant} onChange={handleChange} required />
          <input name="matricule" placeholder="Matricule assuré" value={form.matricule} onChange={handleChange} required />
          <button type="submit" className="btn-primary">💾 Enregistrer</button>
        </form>

        <div className="filters-row">
          <input
            type="text"
            placeholder="🔍 Rechercher acte..."
            className="search-bar"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="date-filters">
            <label>De :</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            <label>À :</label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
          </div>
          <div className="export-buttons">
            <button onClick={() => exportActesToExcel(sorted)} className="btn-secondary">📤 Excel</button>
            <button onClick={() => exportActesToPDF(sorted)} className="btn-secondary">🖨️ PDF</button>
          </div>
        </div>

        <div className="stats-bar">
          <p>🧾 Total actes : <strong>{nbActes}</strong></p>
          <p>💰 Montant total : <strong>{totalMontant.toLocaleString()} FCFA</strong></p>
          <p>📊 Moyenne : <strong>{moyenne.toFixed(0)} FCFA</strong></p>
        </div>

        <div className="actes-table-wrapper">
          <table className="actes-table-modern">
            <thead>
              <tr>
                <th onClick={() => toggleSort('type')}>Type ⬍</th>
                <th onClick={() => toggleSort('centre')}>Centre ⬍</th>
                <th onClick={() => toggleSort('typePEC')}>PEC ⬍</th>
                <th onClick={() => toggleSort('montant')}>Montant ⬍</th>
                <th onClick={() => toggleSort('matricule')}>Matricule ⬍</th>
                <th onClick={() => toggleSort('date')}>Date ⬍</th>
                <th>🗑</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((a, i) => (
                <tr key={i}>
                  <td onClick={() => setSelectedActe(a)}>{a.type}</td>
                  <td onClick={() => setSelectedActe(a)}>{a.centre}</td>
                  <td onClick={() => setSelectedActe(a)}>{a.typePEC}</td>
                  <td onClick={() => setSelectedActe(a)}>{a.montant.toLocaleString()} FCFA</td>
                  <td onClick={() => setSelectedActe(a)}>{a.matricule}</td>
                  <td onClick={() => setSelectedActe(a)}>{new Date(a.date).toLocaleDateString()}</td>
                  <td>
                    <button className="btn-delete" onClick={() => dispatch(deleteActe(a.id))}>❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>⏮️</button>
          <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>◀️</button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>▶️</button>
          <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>⏭️</button>
        </div>

        {/* Modales */}
        {selectedActe && (
          <ActeModal
            acte={selectedActe}
            onClose={() => setSelectedActe(null)}
            onDelete={(id) => {
              dispatch(deleteActe(id))
              setSelectedActe(null)
            }}
            onUpdate={(updated) => {
              dispatch(deleteActe(updated.id))
              dispatch(addActe(updated))
              setSelectedActe(null)
            }}
          />
        )}

        {modalActe && (
          <ActeFormModal
            acte={modalActe.id ? modalActe : null}
            onClose={() => setModalActe(null)}
            onSave={(data) => {
              if (modalActe.id) dispatch(deleteActe(modalActe.id))
              dispatch(addActe(data))
              setModalActe(null)
            }}
          />
        )}
      </div>
    </Layout>
  )
}
