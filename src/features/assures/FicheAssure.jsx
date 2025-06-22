import './FicheAssure.css'
import { useEffect, useState } from 'react'
// import ActesByBeneficiaire from '../../components/ActesByBeneficiaire'
import HistoriqueGlobal from '../../components/HistoriqueGlobal'
import { exportFicheToPDF } from '../../utils/exportFichePDF'

export default function FicheAssure({ matricule }) {
 const [assure, setAssure] = useState(null)
  const [beneficiaires, setBeneficiaires] = useState([])
  const [formB, setFormB] = useState({
    nom: '',
    prenom: '',
    dateNais: '',
    lienFamille: ''
  })

  const handleChangeB = (e) => {
    const { name, value } = e.target
    setFormB(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmitB = async (e) => {
    e.preventDefault()
    await window.api.addBeneficiaire({
      ...formB,
      matriculeAssure: matricule
    })
    const updated = await window.api.getBeneficiaires(matricule)
    setBeneficiaires(updated)
    setFormB({ nom: '', prenom: '', dateNais: '', lienFamille: '' })
  }

  useEffect(() => {
    window.api.getAssures().then(list => {
      const found = list.find(a => a.matricule === matricule)
      setAssure(found)
    })
    window.api.getBeneficiaires(matricule).then(setBeneficiaires)
  }, [matricule])

  if (!assure) return <p>Chargement...</p>

  return (
    <div id="fiche-content">
    <div className="fiche-container">
      <div className="fiche-header">
        <h2>👤 {assure.nom} {assure.prenom}</h2>
        <span>Matricule : <strong>{assure.matricule}</strong></span>
      </div>

      <div className="fiche-info">
        <p><strong>Catégorie :</strong> {assure.categorie}</p>
        <p><strong>Date de naissance :</strong> {assure.dateNais}</p>
        <p><strong>Situation familiale :</strong> {assure.sitFamille}</p>
        <p><strong>Sexe :</strong> {assure.sexe}</p>
      </div>

      <div className="fiche-section">
        {/* liste beneficiaires */}
        <h3>👨‍👩‍👧 Bénéficiaires</h3>
      <ul>
  {beneficiaires.map(b => (
    <li key={b.id}>
      {b.nom} {b.prenom} — {b.lienFamille} — {b.dateNais}
      <button className="delete-btn" onClick={async () => {
        if (confirm('Supprimer ce bénéficiaire ?')) {
          await window.api.deleteBeneficiaire(b.id)
          const updated = await window.api.getBeneficiaires(matricule)
          setBeneficiaires(updated)
        }
      }}>🗑️</button>
    </li>
  ))}
</ul>
<p>
  👥 Total bénéficiaires : <strong>{beneficiaires.length}</strong> — dont :
  <strong> {beneficiaires.filter(b => b.lienFamille.toLowerCase().includes('enfant')).length} enfants</strong>,
  <strong> {beneficiaires.filter(b => b.lienFamille.toLowerCase().includes('conjoint')).length} conjoint(s)</strong>
</p>

{/* nouveau beneficiaire */}
        <form onSubmit={handleSubmitB} className="beneficiaire-form">
  <h4>➕ Ajouter un bénéficiaire</h4>
  <input name="nom" placeholder="Nom" value={formB.nom} onChange={handleChangeB} required />
  <input name="prenom" placeholder="Prénom" value={formB.prenom} onChange={handleChangeB} required />
  <input type="date" name="dateNais" value={formB.dateNais} onChange={handleChangeB} />
  <input name="lienFamille" placeholder="Lien (ex: enfant, conjoint...)" value={formB.lienFamille} onChange={handleChangeB} required />
  <button type="submit">Ajouter</button>
</form>
      </div>

      <div className="fiche-section">
        <h3>📜 Historique des actes</h3>
        <HistoriqueGlobal matricule={matricule} beneficiaires={beneficiaires} />
      </div>

      <div className="fiche-actions">
        <button className="open-db-btn" onClick={() => window.api.openDbFolder()}>
          📂 Ouvrir le dossier de la base
        </button>
      </div>
     
    </div>

     <div style={{ textAlign: 'right' }}>
  <button onClick={() => exportFicheToPDF('fiche-content')}>
    📄 Exporter en PDF
  </button>
</div>
</div>
  )
}
