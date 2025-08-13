import { useEffect, useState } from 'react'

import { exportAssurancesToExcel } from '../../utils/exportAssurances'
import { exportAssurancesToPDF } from '../../utils/exportAssurancesPDF'

import './AssurancesList.css'
import AssurancesTable from './AssurancesTable'
import { useNavigate } from 'react-router-dom'
import FicheAssuranceModal from './FicheAssuranceModal'
import { printAssuranceToPDF } from '../../utils/printAssuranceToPDF'
import { FaPlus, FaPlusCircle } from 'react-icons/fa'
import Title from '../../components/title/Title'
import Layout from '../../components/layout/Layout'

export default function AssurancesList() {
  const [selectedAssurance, setSelectedAssurance] = useState(null)
  const [assurances, setAssurances] = useState([])
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState({ key: 'nPolice', order: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  useEffect(() => {
    refresh()
  }, [])

  const refresh = () => window.api.getAssurances().then(setAssurances)

  const handleDelete = async (id) => {
    if (confirm('Supprimer cette assurance ?')) {
      await window.api.deleteAssurances(id)
      refresh()
    }
  }

  return (
    <Layout>
      <div className="assurances-list">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
       <Title name={'Liste des Assurances'}/>
        <button className="btn-primary" onClick={() => navigate('/assurances/add')}><FaPlus title='Ajouter' />  </button>
      </div>

      <div className="actions">
        <input
          type="text"
          placeholder="🔍 Rechercher..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={() => exportAssurancesToExcel(assurances)}>Excel</button>
        <button onClick={() => exportAssurancesToPDF(assurances)}>Pdf</button>
      </div>

      <AssurancesTable
        data={assurances}
        search={search}
        sort={sort}
        setSort={setSort}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      
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
      </div>
    </Layout>
  )
}
