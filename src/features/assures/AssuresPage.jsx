
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { addAssure, fetchAssures } from './assuresSlice'
import { exportAssuresToExcel } from '../../utils/exportExcel'
import ListeAssures from './ListeAssures'
import FicheAssure from './FicheAssure'
import './AssuresPage.css'
import Layout from '../../components/layout/Layout'

export default function AssuresPage() {
  const dispatch = useDispatch()
  const assures = useSelector(state => state.assures.list)

  const [selectedMatricule, setSelectedMatricule] = useState(null)
  const [form, setForm] = useState({
    matricule: '',
    nom: '',
    prenom: '',
    dateNais: '',
    sexe: 'M',
    sitFamille: 'Célibataire',
    categorie: '',
    client: ''
  })

  useEffect(() => {
    dispatch(fetchAssures())
  }, [dispatch])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addAssure(form))
    setForm({
      matricule: '',
      nom: '',
      prenom: '',
      dateNais: '',
      sexe: 'M',
      sitFamille: 'Célibataire',
      categorie: '',
      client: ''
    })
  }

  return (
    <Layout>
      <h2>👤 Gestion des assurés</h2>

      <form onSubmit={handleSubmit} className="assures-form">
        <input name="matricule" placeholder="Matricule" value={form.matricule} onChange={handleChange} required />
        <input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required />
        <input name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} required />
        <input type="date" name="dateNais" value={form.dateNais} onChange={handleChange} />
        <select name="sexe" value={form.sexe} onChange={handleChange}>
          <option value="M">Masculin</option>
          <option value="F">Féminin</option>
        </select>
        <select name="sitFamille" value={form.sitFamille} onChange={handleChange}>
          <option value="Célibataire">Célibataire</option>
          <option value="Marié">Marié</option>
          <option value="Divorcé">Divorcé</option>
        </select>
        <input name="categorie" placeholder="Catégorie" value={form.categorie} onChange={handleChange} />
        <input name="client" placeholder="Client" value={form.client} onChange={handleChange} />
        <button type="submit">➕ Ajouter</button>
      </form>

      <div className="actions-bar">
        <button onClick={() => exportAssuresToExcel(assures)}>
          📤 Exporter les assurés (.xlsx)
        </button>
      </div>

      <h3>📊 Statistiques</h3>
<ul>
  <li>Nombre total : {assures.length}</li>
  <li>Catégories :
    <ul>
      {[...new Set(assures.map(a => a.categorie))].map(c => (
        <li key={c}>
          {c} : {assures.filter(a => a.categorie === c).length}
        </li>
      ))}
    </ul>
  </li>
  <li>Clients :
    <ul>
      {[...new Set(assures.map(a => a.client))].map(c => (
        <li key={c}>
          {c} : {assures.filter(a => a.client === c).length}
        </li>
      ))}
    </ul>
  </li>
</ul>

{/* 
      <table className="assures-table">
        <thead>
          <tr>
            <th>Matricule</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Naissance</th>
            <th>Sexe</th>
            <th>Client</th>
          </tr>
        </thead>
        <tbody>
          {assures.map((a) => (
            <tr key={a.id}>
              <td>{a.matricule}</td>
              <td>{a.nom}</td>
              <td>{a.prenom}</td>
              <td>{a.dateNais}</td>
              <td>{a.sexe}</td>
              <td>{a.client}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <ListeAssures assures={assures} onSelect={(matricule) => setSelectedMatricule(matricule)} />

      {selectedMatricule && <FicheAssure matricule={selectedMatricule} />}
    </Layout>
  )
}
