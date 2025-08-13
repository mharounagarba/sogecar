import { useEffect, useState } from 'react'




import { useNavigate } from 'react-router-dom'
import './CentresList.css'


import { FaPlus, FaPlusCircle } from 'react-icons/fa'
import Title from '../../components/title/Title'
import Layout from '../../components/layout/Layout'
import CentreModal from './CentreModal'
import CentresTable from './CentresTable'


export default function CentresList() {
  const [selectedCentre, setSelectedCentre] = useState(null)
  const [centres, setCentres] = useState([])

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState({ key: 'nPolice', order: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  useEffect(() => {
    refresh()
  }, [])

  const refresh = () => window.api.getCentres().then(setCentres)



  const handleDelete = async (id) => {
    if (confirm('Supprimer cette centre ?')) {
      await window.api.deleteCentre(id)
      refresh()
    }
  }

  return (
    <Layout>
      <div className="centres-list">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
       <Title name={'Liste des Centres'}/>
        <button className="btn-primary" onClick={() => navigate('/centres/add')}><FaPlus title='Ajouter' />  </button>
      </div>

      <div className="actions">
        <input
          type="text"
          placeholder="🔍 Rechercher..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={() => log("exportCentresToExcel")}>Excel</button>
        <button onClick={() => console.log("exportCentresToPDF")   }>Pdf</button>
      </div>

      <CentresTable
        data={centres}
        search={search}
        sort={sort}
        setSort={setSort}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}

        onDelete={handleDelete}
        // onExportPDF={printCentreToPDF}
        // onExportPDF={exportCentreToPDF}
        onView={setSelectedCentre}
      />

      {selectedCentre && (
        <CentreModal
          centre={selectedCentre}
          onClose={() => setSelectedCentre(null)}
        />
      )}
      </div>
    </Layout>
  )
}

