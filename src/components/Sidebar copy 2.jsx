import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import {
  MdDashboard, MdExpandMore, MdExpandLess,
  MdLocalHospital, MdLocationOn, MdGroup, MdLogout,
  MdPerson, MdSettings, MdPolicy, MdCategory, MdCarRepair
} from 'react-icons/md'
import { FaBuilding, FaUserFriends } from 'react-icons/fa'
import './Sidebar.css'

const menu = [
 
  {
    label: 'Gestion des données',
    items: [
      { to: '/assurances', icon: <MdCarRepair />, label: 'Assurances' },
      { to: '/assures', icon: <FaUserFriends />, label: 'Assurés' },
      { to: '/beneficiaires', icon: <MdGroup />, label: 'Bénéficiaires' },
      { to: '/actes', icon: <MdLocalHospital />, label: 'Actes médicaux' },
      { to: '/centres', icon: <MdLocationOn />, label: 'Centres' },
      { to: '/clients', icon: <FaBuilding />, label: 'Clients' },
      { to: '/types-actes', icon: <MdCategory />, label: 'Types d’actes' },
    ]
  },
  {
    label: 'Configuration',
    items: [
      { to: '/parametres', icon: <MdSettings />, label: 'Paramètres' },
    ]
  }
]
// const menu = [
//   {
//     label: 'Général',
//     items: [
//       { to: '/dashboard', icon: <MdDashboard />, label: 'Dashboard' },
//     ]
//   },
//   {
//     label: 'Gestion des données',
//     items: [
//       { to: '/assures', icon: <FaUserFriends />, label: 'Assurés' },
//       { to: '/beneficiaires', icon: <MdGroup />, label: 'Bénéficiaires' },
//       { to: '/actes', icon: <MdLocalHospital />, label: 'Actes médicaux' },
//       { to: '/centres', icon: <MdLocationOn />, label: 'Centres' },
//       { to: '/clients', icon: <FaBuilding />, label: 'Clients' },
//       { to: '/assurances', icon: <MdCarRepair />, label: 'Assurances' },
//       { to: '/types-actes', icon: <MdCategory />, label: 'Types d’actes' },
//     ]
//   },
//   {
//     label: 'Configuration',
//     items: [
//       { to: '/parametres', icon: <MdSettings />, label: 'Paramètres' },
//     ]
//   }
// ]

export default function Sidebar() {
  const [openSections, setOpenSections] = useState({})

  const toggleSection = (label) => {
    setOpenSections(prev => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <aside className="sidebar">
      <div className="logo">eXgecar</div>

      {menu.map(section => (
        <div key={section.label} className="sidebar-section">
          <div className="section-header" onClick={() => toggleSection(section.label)}>
            <span>{section.label}</span>
            {openSections[section.label]
              ? <MdExpandLess className="arrow" />
              : <MdExpandMore className="arrow" />}
          </div>

          <div className={`section-items ${openSections[section.label] ? 'open' : ''}`}>
            {section.items.map(link => (
              <NavLink
                // key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      ))}

      <button className="logout-btn">
        <MdLogout />
        Déconnexion
      </button>
    </aside>
  )
}
