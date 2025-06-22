import { useEffect, useState } from 'react'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import DashboardMonthly from './components/DashboardMonthly'
import DashboardFilter from './components/DashboardFilter'
import PECAlerts from './components/PECAlerts'
import ActeForm from './features/actes/ActeForm'

function App() {
 
  return (
    <Layout>
      <h1>Bienvenue sur le tableau de bord</h1>
      <p>Ici tu peux naviguer vers les actes, assurés, et plus...</p>
<ActeForm onSuccess={() => window.location.reload()} />
      <h1>PEC Alerts</h1>
    


      <PECAlerts/>
      <Dashboard />
      <DashboardFilter/>
      <DashboardMonthly />
    </Layout>
  )
}

export default App
