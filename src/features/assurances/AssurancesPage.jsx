import { useEffect, useState } from 'react'

import { exportAssurancesToExcel } from '../../utils/exportAssurances'
import { exportAssurancesToPDF } from '../../utils/exportAssurancesPDF'
import AssuranceForm from './AssuranceForm'
import AssurancesTable from './AssurancesTable'
import './AssurancesPage.css'
import { useNavigate } from 'react-router-dom'
import { exportAssuranceToPDF } from '../../utils/exportAssuranceToPDF'
import FicheAssuranceModal from './FicheAssuranceModal'
import { printAssuranceToPDF } from '../../utils/printAssuranceToPDF'
import Layout from '../../components/layout/Layout'

export default function AssurancesPage() {
  const [selectedAssurance, setSelectedAssurance] = useState(null)
  const [assurances, setAssurances] = useState([])
  const [form, setForm] = useState(initAssurance)
  const [editing, setEditing] = useState(false)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState({ key: 'nPolice', order: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
const navigate = useNavigate()
  useEffect(() => {
    refresh()
  }, [])

  const refresh = () => window.api.getAssurances().then(setAssurances)

  const handleSubmit = async () => {
    editing ? await window.api.updateAssurances(form)
            : await window.api.addAssurances(form)
    setForm(initAssurance)
    setEditing(false)
    refresh()
  }

  const handleEdit = (data) => {
    setForm(data)
    setEditing(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Supprimer cette assurance ?')) {
      await window.api.deleteAssurances(id)
      refresh()
    }
  }

  return (
    <Layout>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2>🚘 Liste des Assurances</h2>
      <button className="btn-primary" onClick={() => navigate('/assurances/add')}>➕ Ajouter</button>
    </div>

      <div className="actions">
        <input
          type="text"
          placeholder="🔍 Rechercher..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={() => exportAssurancesToExcel(assurances)}>📤 Excel</button>
        <button onClick={() => exportAssurancesToPDF(assurances)}>📤 Export</button>
      </div>

      <AssurancesTable
        data={assurances}
        search={search}
        sort={sort}
        setSort={setSort}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onExportPDF={printAssuranceToPDF}
        // onExportPDF={exportAssuranceToPDF}
          onView={setSelectedAssurance}
      />

      {selectedAssurance && (
  <FicheAssuranceModal
    assurance={selectedAssurance}
    onClose={() => setSelectedAssurance(null)}
  />
)}
    </Layout>
  )
}

const initAssurance = {
  id: null, nordre: '', nCarton: '', nAssure: '', nPolice: '', souscripteur: '',
  profession: '', adresse: '', echeance: '', validite_du: '', validite_au: '',
  prise_effet: '', genre: '', marque: '', immat_moteur: '', categorie_usage: '',
  expirer: false, date_saisie: '', qui_saisie: '', assureur: '', prime_ttc: ''
}
