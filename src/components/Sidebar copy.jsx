import { NavLink } from 'react-router-dom'
import './Layout.css'

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <NavLink to="/dashboard">📊 Dashboard</NavLink>
      <NavLink to="/assurances">📁 Assurances</NavLink>
      <NavLink to="/actes">📁 Actes</NavLink>
      <NavLink to="/assures">👤 Assurés</NavLink>
      <NavLink to="/beneficiaire">📁 Bénéficiaires</NavLink>
      <NavLink to="/centres">📁 Centres</NavLink>
      <NavLink to="/clients">📁 Clients</NavLink>
      <NavLink to="/utilisateurs">👥 Utilisateurs</NavLink>
    </nav>
  )
}
