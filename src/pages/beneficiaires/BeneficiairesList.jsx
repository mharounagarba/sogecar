import { useEffect, useState } from 'react'




import { useNavigate } from 'react-router-dom'
import './BeneficiairesList.css'


import { FaPlus, FaPlusCircle } from 'react-icons/fa'
import Title from '../../components/title/Title'
import Layout from '../../components/layout/Layout'
import BeneficiaireModal from './beneficiaireModal'
import BeneficiairesTable from './BeneficiairesTable'


export default function BeneficiairesList() {
  const [selectedBeneficiaire, setSelectedBeneficiaire] = useState(null)
  const [beneficiaires, setBeneficiaires] = useState([])

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState({ key: 'nPolice', order: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  useEffect(() => {
    refresh()
  }, [])

  const refresh = () => window.api.getAllBeneficiaires().then(setBeneficiaires)



  const handleDelete = async (id) => {
    if (confirm('Supprimer cette beneficiaire ?')) {
      await window.api.deleteBeneficiaire(id)
      refresh()
    }
  }

  return (
    <Layout>
      <div className="beneficiaires-list">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
       <Title name={'Liste des Beneficiaires'}/>
        <button className="btn-primary" onClick={() => navigate('/beneficiaires/add')}><FaPlus title='Ajouter' />  </button>
      </div>

      <div className="actions">
        <input
          type="text"
          placeholder="🔍 Rechercher..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={() => log("exportBeneficiairesToExcel")}>Excel</button>
        <button onClick={() => console.log("exportBeneficiairesToPDF")   }>Pdf</button>
      </div>

      <BeneficiairesTable
        data={beneficiaires}
        search={search}
        sort={sort}
        setSort={setSort}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}

        onDelete={handleDelete}
        // onExportPDF={printBeneficiaireToPDF}
        // onExportPDF={exportBeneficiaireToPDF}
        onView={setSelectedBeneficiaire}
      />

      {selectedBeneficiaire && (
        <BeneficiaireModal
          beneficiaire={selectedBeneficiaire}
          onClose={() => setSelectedBeneficiaire(null)}
        />
      )}
      </div>
    </Layout>
  )
}

