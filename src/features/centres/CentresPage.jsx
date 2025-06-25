import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import { fetchCentres } from './centresSlice'
import CentreModal from './CentreModal'
import './CentresPage.css'

export default function CentresPage() {
  const dispatch = useDispatch()
  const centres = useSelector(state => state.centres.list)
  const [modal, setModal] = useState(null)

  useEffect(() => {
    dispatch(fetchCentres())
  }, [dispatch])

  return (
    <Layout>
      <h2>🏥 Centres médicaux</h2>
      <button className="btn-primary" onClick={() => setModal({})}>➕ Ajouter un centre</button>
      <table className="centres-table">
        <thead>
          <tr>
            <th>Nom</th><th>Type</th><th>Conventionné</th><th>Ville</th><th>Contact</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {centres.map(c => (
            <tr key={c.id}>
              <td>{c.nom}</td>
              <td>{c.type}</td>
              <td>{c.convention ? 'Oui' : 'Non'}</td>
              <td>{c.ville}</td>
              <td>{c.contact}</td>
              <td>
                <button onClick={() => setModal(c)}>✏️</button>
                <button onClick={async () => {
                  await window.api.deleteCentre(c.id)
                  dispatch(fetchCentres())
                }}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal && (
        <CentreModal
          centre={modal}
          onClose={() => {
            setModal(null)
            dispatch(fetchCentres())
          }}
        />
      )}
    </Layout>
  )
}
