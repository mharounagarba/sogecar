import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchActes, addActe, deleteActe } from './actesSlice'
import Layout from '../../components/Layout'

export default function ActesPage() {
  const dispatch = useDispatch()
  const actes = useSelector(state => state.actes.list)
  const [form, setForm] = useState({
    type: '',
    centre: '',
    typePEC: 'Mutuelle',
    montant: '',
    matricule: ''
  })

  useEffect(() => {
    dispatch(fetchActes())
  }, [dispatch])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addActe({ ...form, date: new Date().toISOString() }))
    setForm({ type: '', centre: '', typePEC: 'Mutuelle', montant: '', matricule: '' })
  }

  return (
    <Layout>
      <h2>📄 Liste des actes médicaux</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input name="type" placeholder="Type d'acte" value={form.type} onChange={handleChange} required />
        <input name="centre" placeholder="Centre" value={form.centre} onChange={handleChange} required />
        <select name="typePEC" value={form.typePEC} onChange={handleChange}>
          <option value="Mutuelle">Mutuelle</option>
          <option value="Société">Société</option>
          <option value="Agent">Agent</option>
        </select>
        <input type="number" name="montant" placeholder="Montant" value={form.montant} onChange={handleChange} required />
        <input name="matricule" placeholder="Matricule assuré" value={form.matricule} onChange={handleChange} required />
        <button type="submit">➕ Ajouter</button>
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Type</th><th>Centre</th><th>PEC</th><th>Montant</th><th>Matricule</th><th>Date</th><th>🗑</th>
          </tr>
        </thead>
        <tbody>
          {actes.map((a, i) => (
            <tr key={i}>
              <td>{a.type}</td>
              <td>{a.centre}</td>
              <td>{a.typePEC}</td>
              <td>{a.montant} €</td>
              <td>{a.matricule}</td>
              <td>{new Date(a.date).toLocaleDateString()}</td>
              <td><button onClick={() => dispatch(deleteActe(a.id))}>❌</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}
