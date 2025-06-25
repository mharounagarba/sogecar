import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { exportAssurancesToExcel } from '../../utils/exportAssurances'
import { exportAssurancesToPDF } from '../../utils/exportAssurancesPDF'
import './AssurancesPage.css'

export default function AssurancesPage() {
  const [assurances, setAssurances] = useState([])
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState({ key: 'nPolice', order: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    id: null, nordre: '', nCarton: '', nAssure: '', nPolice: '', souscripteur: '',
    profession: '', adresse: '', echeance: '', validite_du: '', validite_au: '',
    prise_effet: '', genre: '', marque: '', immat_moteur: '', categorie_usage: '',
    expirer: false, date_saisie: '', qui_saisie: '', assureur: '', prime_ttc: ''
  })

  useEffect(() => {
    refresh()
  }, [])

  const refresh = () => {
    window.api.getAssurances().then(setAssurances)
  }

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (editing) await window.api.updateAssurances(form)
    else await window.api.addAssurances(form)
    setForm({ ...form, id: null })
    setEditing(false)
    refresh()
  }

  const handleEdit = (assurance) => {
    setForm(assurance)
    setEditing(true)
  }

  const handleDelete = async id => {
    if (confirm('❗ Supprimer cette assurance ?')) {
      await window.api.deleteAssurances(id)
      refresh()
    }
  }

  const toggleSort = key => {
    setSort(prev => ({
      key,
      order: prev.key === key && prev.order === 'asc' ? 'desc' : 'asc'
    }))
  }

  const handlePrint = () => window.print()

  const filtered = assurances.filter(a =>
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

  const totalPages = Math.ceil(sorted.length / itemsPerPage)
  const paginated = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <Layout>
      <h2>🚘 Gestion des Assurances</h2>

      <form className="assurance-form" onSubmit={handleSubmit}>
        <input name="nordre" placeholder="N° Ordre" value={form.nordre} onChange={handleChange} />
        <input name="nCarton" placeholder="N° Carton" value={form.nCarton} onChange={handleChange} />
        <input name="nAssure" placeholder="N° Assuré" value={form.nAssure} onChange={handleChange} />
        <input name="nPolice" placeholder="N° Police" value={form.nPolice} onChange={handleChange} required />
        <input name="souscripteur" placeholder="Souscripteur" value={form.souscripteur} onChange={handleChange} />
        <input name="profession" placeholder="Profession" value={form.profession} onChange={handleChange} />
        <input name="adresse" placeholder="Adresse" value={form.adresse} onChange={handleChange} />
        <input name="echeance" type="number" placeholder="Échéance" value={form.echeance} onChange={handleChange} />
        <input name="validite_du" type="date" value={form.validite_du} onChange={handleChange} />
        <input name="validite_au" type="date" value={form.validite_au} onChange={handleChange} />
        <input name="prise_effet" type="date" value={form.prise_effet} onChange={handleChange} />
        <input name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} />
        <input name="marque" placeholder="Marque" value={form.marque} onChange={handleChange} />
        <input name="immat_moteur" placeholder="Immat./Moteur" value={form.immat_moteur} onChange={handleChange} />
        <input name="categorie_usage" placeholder="Catégorie/Usage" value={form.categorie_usage} onChange={handleChange} />
        <label>
          <input type="checkbox" name="expirer" checked={form.expirer} onChange={handleChange} />
          Expiré
        </label>
        <input name="date_saisie" type="date" value={form.date_saisie} onChange={handleChange} />
        <input name="qui_saisie" placeholder="Qui a saisi ?" value={form.qui_saisie} onChange={handleChange} />
        <input name="assureur" placeholder="Assureur" value={form.assureur} onChange={handleChange} />
        <input name="prime_ttc" type="number" placeholder="Prime TTC" value={form.prime_ttc} onChange={handleChange} />
        <button type="submit" className="btn-primary">{editing ? '💾 Modifier' : '➕ Ajouter'}</button>
      </form>

      <div className="actions">
        <input
          type="text"
          placeholder="🔍 Rechercher..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={() => exportAssurancesToExcel(sorted)}>📤 Excel</button>
      </div>

      <table className="assurances-table">
        <thead>
          <tr>
            <th onClick={() => toggleSort('nPolice')}>Police ⬍</th>
            <th onClick={() => toggleSort('souscripteur')}>Souscripteur ⬍</th>
            <th onClick={() => toggleSort('marque')}>Marque ⬍</th>
            <th onClick={() => toggleSort('prime_ttc')}>Prime TTC ⬍</th>
            <th>Validité</th>
            <th>⛔</th>
            <th>📝</th>
            <th>🖨️</th>
            <th>📄</th>
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
              <td><button onClick={() => handleDelete(a.id)}>❌</button></td>
              <td><button onClick={() => handleEdit(a)}>📝</button></td>
              <td><button onClick={handlePrint}>🖨️</button></td>
              <td><button onClick={() => exportAssurancesToPDF(a)}>📄</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>⏮️</button>
        <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}>◀️</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} className={currentPage === i + 1 ? 'active' : ''} onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </button>
        ))}
        <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}>▶️</button>
        <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>⏭️</button>
      </div>
    </Layout>
  )
}
