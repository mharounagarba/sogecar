// src/components/Breadcrumb.jsx

import { Link, useLocation } from 'react-router-dom'
import './Breadcrumb.css'

// Traduction des segments de chemin en français
const labels = {
  assurances: 'Assurances',
  add: 'Ajouter',
  update: 'Modifier',
  clients: 'Clients',
  actes: 'Actes médicaux',
  beneficiaires: 'Bénéficiaires',
  assures: 'Assurés',
  centres: 'Centres',
  utilisateurs: 'Utilisateurs',
  parametres: 'Paramètres'
}

export default function Breadcrumb() {
  const { pathname } = useLocation()

  // Découpe l'URL en segments
  const segments = pathname.split('/').filter(Boolean)

  // Permet de reconstruire les chemins dynamiquement
  const pathStack = []

  return (
    <nav className="breadcrumb">
      <Link to="/dashboard" className="breadcrumb-link">🏠 Accueil</Link>

      {segments.map((seg, i) => {
        const isLast = i === segments.length - 1
        const isNumeric = /^\d+$/.test(seg) // Segment = ID ?

        pathStack.push(seg)
        const url = '/' + pathStack.join('/')

        // const label = labels[seg] || (isNumeric ? `#${seg}`) || seg.charAt(0).toUpperCase() + seg.slice(1)
const label = 
  labels[seg] ?? 
  (isNumeric ? `#${seg}` : seg.charAt(0).toUpperCase() + seg.slice(1))

        return (
          <span key={i}>
            <span className="breadcrumb-separator">›</span>
            {isLast || isNumeric ? (
              <span className="breadcrumb-current">{label}</span>
            ) : (
              <Link to={url} className="breadcrumb-link">{label}</Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
