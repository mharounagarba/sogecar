import { useEffect, useState } from 'react'




import { useNavigate } from 'react-router-dom'
import './ClientsList.css'


import { FaPlus, FaPlusCircle } from 'react-icons/fa'
import Title from '../../components/title/Title'
import Layout from '../../components/layout/Layout'
import ClientModal from './ClientModal'
import ClientsTable from './ClientsTable'


export default function ClientsList() {
  const [selectedClient, setSelectedClient] = useState(null)
  const [clients, setClients] = useState([])

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState({ key: 'nPolice', order: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  useEffect(() => {
    refresh()
  }, [])

  const refresh = () => window.api.getClients().then(setClients)



  const handleDelete = async (id) => {
    if (confirm('Supprimer cette client ?')) {
      await window.api.deleteClient(id)
      refresh()
    }
  }

  return (
    <Layout>
      <div className="clients-list">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
       <Title name={'Liste des Clients'}/>
        <button className="btn-primary" onClick={() => navigate('/clients/add')}><FaPlus title='Ajouter' />  </button>
      </div>

      <div className="actions">
        <input
          type="text"
          placeholder="🔍 Rechercher..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={() => log("exportClientsToExcel")}>Excel</button>
        <button onClick={() => console.log("exportClientsToPDF")   }>Pdf</button>
      </div>

      <ClientsTable
        data={clients}
        search={search}
        sort={sort}
        setSort={setSort}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}

        onDelete={handleDelete}
        // onExportPDF={printClientToPDF}
        // onExportPDF={exportClientToPDF}
        onView={setSelectedClient}
      />

      {selectedClient && (
        <ClientModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}
      </div>
    </Layout>
  )
}

