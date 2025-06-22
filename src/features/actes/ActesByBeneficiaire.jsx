import { useEffect, useState } from 'react'

export default function ActesByBeneficiaire({ matricule }) {
  const [actes, setActes] = useState([])

  useEffect(() => {
    if (matricule) {
      window.api.getActes().then(all => {
        const filtres = all.filter(a => a.matricule === matricule)
        setActes(filtres)
      })
    }
  }, [matricule])

  return (
    <>
      <h3>📜 Historique des actes pour : {matricule}</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Centre</th>
            <th>PEC</th>
            <th>Date</th>
            <th>Montant</th>
          </tr>
        </thead>
        <tbody>
          {actes.map((a) => (
            <tr key={a.id}>
              <td>{a.type}</td>
              <td>{a.centre}</td>
              <td>{a.typePEC}</td>
              <td>{a.date}</td>
              <td>{a.montant.toLocaleString()} FCFA</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
