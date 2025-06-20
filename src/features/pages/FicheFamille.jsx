import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'

export default function FicheFamille() {
  const [assures, setAssures] = useState([])
  const [selected, setSelected] = useState(null)
  const [beneficiaires, setBeneficiaires] = useState([])

  useEffect(() => {
    window.api.getAssures().then(setAssures)
  }, [])

  const handleSelect = (assure) => {
    setSelected(assure)
    window.api.getBeneficiaires(assure.matricule).then(setBeneficiaires)
  }

  return (
    <Layout>
      <h2>👨‍👩‍👧‍👦 Fiche Famille</h2>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1 }}>
          <h3>Assurés</h3>
          <ul>
            {assures.map(a => (
              <li key={a.id}>
                <button onClick={() => handleSelect(a)}>
                  {a.nom} {a.prenom} ({a.matricule})
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ flex: 2 }}>
          {selected && (
            <>
              <h3>Famille de {selected.nom} {selected.prenom}</h3>
              <ul>
                {beneficiaires.map(b => (
                  <li key={b.id}>
                    {b.prenom} {b.nom} - {b.lienFamille}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}
