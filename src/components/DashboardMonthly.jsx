import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import dayjs from 'dayjs'

export default function DashboardMonthly() {
  const [data, setData] = useState([])

  useEffect(() => {
    window.api.getActes().then(actes => {
      const byMonth = actes.reduce((acc, acte) => {
        const month = dayjs(acte.date).format('YYYY-MM')
        acc[month] = (acc[month] || 0) + acte.montant
        return acc
      }, {})

      const formatted = Object.entries(byMonth).map(([mois, montant]) => ({
        mois, montant
      })).sort((a, b) => a.mois.localeCompare(b.mois))

      setData(formatted)
    })
  }, [])

  return (
    <div style={{ width: '50%', height: 300, marginTop: 40 }}>
      <h3>📈 Montant total des actes par mois</h3>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="mois" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="montant" stroke="#00C49F" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
