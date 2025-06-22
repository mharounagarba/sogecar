import { useState, useEffect } from 'react'
import ActeFilters from '../features/actes/ActeFilters'
import { exportActesToExcel } from '../utils/exportExcel'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function DashboardFilter() {
  const [actes, setActes] = useState([])
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    window.api.getActes().then(setActes)
  }, [])

  const data = filtered.reduce((acc, a) => {
    acc[a.typePEC] = (acc[a.typePEC] || 0) + a.montant
    return acc
  }, {})

  const chartData = Object.entries(data).map(([typePEC, montant]) => ({
    typePEC, montant
  }))

  return (
    <>
      <h2>📊 Tableau de bord des actes</h2>

      <ActeFilters actes={actes} onFilter={setFiltered} />

      <button onClick={() => exportActesToExcel(filtered)} style={{ marginBottom: '1rem' }}>
        📤 Exporter les actes filtrés
      </button>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="typePEC" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="montant" fill="#0078D7" />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}
