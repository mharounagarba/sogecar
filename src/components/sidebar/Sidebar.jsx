import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  MdExpandMore, MdExpandLess,
  MdLocalHospital, MdLocationOn, MdGroup,
  MdSettings, MdCategory, MdCarRepair, MdLogout,
  MdBarChart
} from 'react-icons/md'
import { FaBuilding, FaUserFriends } from 'react-icons/fa'
import './Sidebar.css'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/auth/authSlice'

const menuSections = [
  {
    label: 'Statistiques',
    items: [
      { to: '/dashboard', icon: <MdBarChart/>, label: 'Tableau de bord' },

    ]
  },
  {
    label: 'Productions',
    items: [
      { to: '/assurances', icon: <MdCarRepair />, label: 'Assurances' },
      { to: '/actes', icon: <MdLocalHospital />, label: 'Actes médicaux' },
      { to: '/assures', icon: <FaUserFriends />, label: 'Assurés' },
      { to: '/beneficiaires', icon: <MdGroup />, label: 'Bénéficiaires' },
      { to: '/centres', icon: <MdLocationOn />, label: 'Centres' },
      { to: '/clients', icon: <FaBuilding />, label: 'Clients' },
    ]
  },
  {
    label: 'Données',
    items: [
      // { to: '/assurance', icon: <MdCarRepair />, label: 'Assurances' },
      { to: '/actesOld', icon: <MdLocalHospital />, label: 'Actes Old' },
      { to: '/assuresOld', icon: <FaUserFriends />, label: 'Assurés Old' },
      { to: '/beneficiairesOld', icon: <MdGroup />, label: 'Bénéficiaires Old' },
      { to: '/centresOld', icon: <MdLocationOn />, label: 'Centres Old' },
      { to: '/clientsOld', icon: <FaBuilding />, label: 'Clients Old' },
      // { to: '/types-actes', icon: <MdCategory />, label: 'Types d’actes' },
    ]
  },
  {
    label: 'Configuration',
    items: [
      { to: '/utilisateurs', icon: <MdSettings />, label: 'Paramètres' },
    ]
  }
]

export default function Sidebar() {
  const location = useLocation()
  const [openSections, setOpenSections] = useState({})
  const initialized = useRef(false)

   const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }
  // Charger l'état sauvegardé ou initialiser selon la route active
  useMemo(() => {
    if (initialized.current) return
    const saved = localStorage.getItem('sidebar-open-sections')
    if (saved) {
      setOpenSections(JSON.parse(saved))
    } else {
      const initial = {}
      menuSections.forEach(section => {
        const isActive = section.items.some(item =>
          location.pathname.startsWith(item.to)
        )
        if (isActive) initial[section.label] = true
      })
      setOpenSections(initial)
    }
    initialized.current = true
  }, [])

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('sidebar-open-sections', JSON.stringify(openSections))
  }, [openSections])

  const toggleSection = (label) => {
    setOpenSections(prev => ({
      ...prev,
      [label]: !prev[label]
    }))
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">SOGECAR</div>

      {menuSections.map(section => (
        <div key={section.label} className="sidebar-section">
          <div
            className="section-header"
            onClick={() => toggleSection(section.label)}
          >
            <span>{section.label}</span>
            {openSections[section.label] ? <MdExpandLess /> : <MdExpandMore />}
          </div>

          <div className={`section-items ${openSections[section.label] ? 'open' : ''}`}>
            {section.items.map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
              >
                {icon}
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      ))}

      <button onClick={handleLogout} className="logout-btn">
        <MdLogout />
        Déconnexion
      </button>
    </aside>
  )
}
