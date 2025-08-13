import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../../components/layout/Layout'


export default function ClientAssuresPage() {
    const navigate = useNavigate()
  const { id } = useParams()
  const [client, setClient] = useState(null)
  const [assures, setAssures] = useState([])

  useEffect(() => {
    window.api.getClients().then(list => {
      const found = list.find(c => c.id === parseInt(id))
      setClient(found)
    })
    window.api.getAssures().then(all => {
      setAssures(all.filter(a => a.clientId === parseInt(id)))
    })
  }, [id])

  if (!client) return <Layout><p>Chargement...</p></Layout>

  return (
    <Layout>
      <h2>👤 Client : {client.nom}</h2>
      <p><strong>Email :</strong> {client.email}</p>
      <p><strong>Téléphone :</strong> {client.telephone}</p>

      <h3>📋 Liste des assurés liés</h3>
      <table className="assures-table">
        <thead>
          <tr>
            <th>Matricule</th><th>Nom</th><th>Prénom</th><th>Catégorie</th>
          </tr>
        </thead>
        <tbody>
          {assures.map(a => (
            <tr key={a.id}>
              <td>{a.matricule}</td>
              <td>{a.nom}</td>
              <td>{a.prenom}</td>
              <td>{a.categorie}</td>
            </tr>
          ))}
        </tbody>
      </table>
<div><button onClick={()=>navigate('/clients')}>Retour</button></div>
    </Layout>
  )
}
