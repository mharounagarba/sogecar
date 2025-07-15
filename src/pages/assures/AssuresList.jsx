import { useEffect, useState } from 'react'


import './AssuresList.css'
import AssuresTable from './AssuresTable'
import { useNavigate } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import Title from '../../components/title/Title'
import Layout from '../../components/layout/Layout'
import AssureModal from './AssureModal'

export default function AssuresList() {
  const [selectedAssure, setSelectedAssure] = useState(null)
  const [assures, setAssures] = useState([])

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState({ key: 'nPolice', order: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  useEffect(() => {
    refresh()
  }, [])

  const refresh = () => window.api.getAssures().then(setAssures)



  const handleDelete = async (id) => {
    if (confirm('Supprimer cette assure ?')) {
      await window.api.deleteAssure(id)
      refresh()
    }
  }

  return (
    <Layout>
      <div className="assures-list">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
       <Title name={'Liste des Assures'}/>
        <button className="btn-primary" onClick={() => navigate('/assures/add')}><FaPlus title='Ajouter' />  </button>
      </div>

      <div className="actions">
        <input
          type="text"
          placeholder="🔍 Rechercher..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={() => log("exportAssuresToExcel")}>Excel</button>
        <button onClick={() => console.log("exportAssuresToPDF")   }>Pdf</button>
      </div>

      <AssuresTable
        data={assures}
        search={search}
        sort={sort}
        setSort={setSort}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}

        onDelete={handleDelete}
        // onExportPDF={printAssureToPDF}
        // onExportPDF={exportAssureToPDF}
        onView={setSelectedAssure}
      />

      {selectedAssure && (
        <AssureModal
          assure={selectedAssure}
          onClose={() => setSelectedAssure(null)}
        />
      )}
      </div>
    </Layout>
  )
}

