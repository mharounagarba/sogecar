import { useEffect, useState } from 'react'
import './PECAlerts.css'

const PLAFOND_PEC = 100000

export default function PECAlerts() {
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    window.api.getActes().then(actes => {
      const cumul = actes.reduce((acc, acte) => {
        acc[acte.matricule] = (acc[acte.matricule] || 0) + acte.montant
        return acc
      }, {})

      const dépassés = Object.entries(cumul)
        .filter(([_, montant]) => montant > PLAFOND_PEC)
        .map(([matricule, montant]) => ({ matricule, montant }))

      setAlerts(dépassés)
    })
  }, [])

  return (
    <>
      {alerts.length > 0 && (
        <div className="pec-alert-box">
          <h4>🚨 Bénéficiaires au-dessus du plafond PEC ({PLAFOND_PEC.toLocaleString()} FCFA)</h4>
          <ul>
            {alerts.map(a => (
              <li key={a.matricule}>
                ➤ Matricule <strong>{a.matricule}</strong> : {a.montant.toLocaleString()} FCFA
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
