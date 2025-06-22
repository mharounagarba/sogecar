import { useEffect, useState } from 'react'
import './HistoriqueGlobal.css'

export default function HistoriqueGlobal({ matricule, beneficiaires }) {
  const [actes, setActes] = useState([])

  useEffect(() => {
    window.api.getActes().then(all => {
      const tousLesMatricules = [
        matricule,
        ...beneficiaires.map(b => b.matriculeAssure)
      ]

      const filtrés = all.filter(a => tousLesMatricules.includes(a.matricule))
      setActes(filtrés)
    })
  }, [matricule, beneficiaires])

  if (actes.length === 0) return <p>Aucun acte trouvé.</p>

  return (
    <div className="historique-container">
      <table className="historique-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Centre</th>
            <th>PEC</th>
            <th>Montant</th>
            <th>Matricule</th>
          </tr>
        </thead>
        <tbody>
          {actes.map(acte => (
            <tr key={acte.id}>
              <td>{acte.date}</td>
              <td>{acte.type}</td>
              <td>{acte.centre}</td>
              <td>{acte.typePEC}</td>
              <td>{acte.montant.toLocaleString()} FCFA</td>
              <td>{acte.matricule}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
