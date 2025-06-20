import { NavLink } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>SOGECAR</h2>
      <nav>
        <NavLink to="/dashboard">🏠 Accueil</NavLink>
        <NavLink to="/actes">📄 Actes</NavLink>
        <NavLink to="/assures">👥 Assurés</NavLink>
        <NavLink to="/utilisateurs">🧑‍💼 Utilisateurs</NavLink>
      </nav>
    </aside>
  )
}
