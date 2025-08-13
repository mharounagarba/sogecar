import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
  const [data, setData] = useState([])

  useEffect(() => {
    window.api.getActes().then(actes => {
      // Agrégation simple : total par typePEC
      const stats = actes.reduce((acc, acte) => {
        acc[acte.typePEC] = (acc[acte.typePEC] || 0) + acte.montant
        return acc
      }, {})

      const formatted = Object.entries(stats).map(([typePEC, montant]) => ({
        typePEC, montant
      }))

      setData(formatted)
    })
  }, [])

  return (
    <div style={{ width: '30%', height: 300 }}>
      <h3>💹 Montant total par type de PEC</h3>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="typePEC" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="montant" fill="#0078D7" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
