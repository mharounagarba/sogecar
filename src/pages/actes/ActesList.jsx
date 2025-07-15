import { useEffect, useState } from 'react'

import { exportActesToExcel } from '../../utils/exportActes'
import { exportActesToPDF } from '../../utils/exportActesPDF'

import './ActesList.css'
import ActesTable from './ActesTable'
import { useNavigate } from 'react-router-dom'
import FicheActeModal from './ActeModal'
import { printActeToPDF } from '../../utils/printActeToPDF'
import { FaPlus, FaPlusCircle } from 'react-icons/fa'
import Title from '../../components/title/Title'
import Layout from '../../components/layout/Layout'
import ActeModal from './ActeModal'

export default function ActesList() {
  const [selectedActe, setSelectedActe] = useState(null)
  const [actes, setActes] = useState([])

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState({ key: 'nPolice', order: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  useEffect(() => {
    refresh()
  }, [])

  const refresh = () => window.api.getActes().then(setActes)



  const handleDelete = async (id) => {
    if (confirm('Supprimer cette acte ?')) {
      await window.api.deleteActe(id)
      refresh()
    }
  }

  return (
    <Layout>
      <div className="actes-list">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
       <Title name={'Liste des Actes'}/>
        <button className="btn-primary" onClick={() => navigate('/actes/add')}><FaPlus title='Ajouter' />  </button>
      </div>

      <div className="actions">
        <input
          type="text"
          placeholder="🔍 Rechercher..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={() => log("exportActesToExcel")}>Excel</button>
        <button onClick={() => console.log("exportActesToPDF")   }>Pdf</button>
      </div>

      <ActesTable
        data={actes}
        search={search}
        sort={sort}
        setSort={setSort}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}

        onDelete={handleDelete}
        onExportPDF={printActeToPDF}
        // onExportPDF={exportActeToPDF}
        onView={setSelectedActe}
      />

      {selectedActe && (
        <ActeModal
          acte={selectedActe}
          onClose={() => setSelectedActe(null)}
        />
      )}
      </div>
    </Layout>
  )
}

