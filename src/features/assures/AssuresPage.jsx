import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { addAssure, fetchAssures } from './assuresSlice'
import './AssuresPage.css'

export default function AssuresPage() {
  const dispatch = useDispatch()
  const assures = useSelector(state => state.assures.list)
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

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(addAssure(form))
    setForm({ matricule: '', nom: '', prenom: '', dateNais: '', sexe: 'M', sitFamille: 'Célibataire', categorie: '', client: '' })
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
        <option>Célibataire</option>
        <option>Marié</option>
        <option>Divorcé</option>
      </select>
      <input name="categorie" placeholder="Catégorie" value={form.categorie} onChange={handleChange} />
      <input name="client" placeholder="Client" value={form.client} onChange={handleChange} />
      <button type="submit">➕ Ajouter</button>
    </form>

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
        {assures.map(a => (
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
    </table>
  </Layout>
  )
}
