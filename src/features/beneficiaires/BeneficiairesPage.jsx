import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import FicheBeneficiaire from './FicheBeneficiaire'
import { exportBeneficiairesToExcel } from '../../utils/exportBeneficiaires'
import { exportBeneficiairesToPDF } from '../../utils/exportBeneficiairesPDF'
import './BeneficiairesPage.css'
import FicheBeneficiaireModal from './FicheBeneficiaireModal'

export default function BeneficiairesPage() {
  const [beneficiaires, setBeneficiaires] = useState([])
  const [assures, setAssures] = useState([])
  const [form, setForm] = useState({
    id: null,
    matriculeAssure: '',
    nom: '',
    prenom: '',
    dateNais: '',
    lienFamille: 'Enfant',
  })

  const [editing, setEditing] = useState(false)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    window.api.getAssures().then(setAssures)
    refresh()
  }, [])

  const refresh = () => {
    window.api.getAllBeneficiaires().then(setBeneficiaires)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editing) {
      await window.api.updateBeneficiaire(form)
    } else {
      await window.api.addBeneficiaire(form)
    }
    setForm({
      id: null,
      matriculeAssure: '',
      nom: '',
      prenom: '',
      dateNais: '',
      lienFamille: 'Enfant',
    })
    setEditing(false)
    refresh()
  }

  const handleEdit = (benef) => {
    setForm(benef)
    setEditing(true)
  }

  const handleDelete = async (id) => {
    if (confirm('❗ Supprimer ce bénéficiaire ?')) {
      await window.api.deleteBeneficiaire(id)
      refresh()
    }
  }

  const filtered = beneficiaires.filter(b =>
    b.nom.toLowerCase().includes(search.toLowerCase()) ||
    b.prenom.toLowerCase().includes(search.toLowerCase()) ||
    b.matriculeAssure.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Layout>
      <div className="beneficiaires-container">
        <h2>👨‍👩‍👧 Gestion des bénéficiaires</h2>

        <form onSubmit={handleSubmit} className="beneficiaire-form">
          <select
            name="matriculeAssure"
            value={form.matriculeAssure}
            onChange={handleChange}
            required
          >
            <option value="">🧍 Choisir un assuré</option>
            {assures.map(a => (
              <option key={a.id} value={a.matricule}>
                {a.nom} {a.prenom} — {a.matricule}
              </option>
            ))}
          </select>
          <input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required />
          <input name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} required />
          <input type="date" name="dateNais" value={form.dateNais} onChange={handleChange} />
          <select name="lienFamille" value={form.lienFamille} onChange={handleChange}>
            <option>Enfant</option>
            <option>Conjoint</option>
            <option>Parent</option>
          </select>
          <button type="submit" className="btn-primary">
            {editing ? '💾 Modifier' : '➕ Ajouter'}
          </button>
        </form>

        <div className="actions">
          <input
            type="text"
            placeholder="🔍 Rechercher..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-bar"
          />
          <button onClick={() => exportBeneficiairesToExcel(beneficiaires)} className="btn-secondary">📤 Excel</button>
          <button onClick={() => exportBeneficiairesToPDF(beneficiaires)} className="btn-secondary">🖨️ PDF</button>
        </div>

        <table className="beneficiaires-table">
          <thead>
            <tr>
              <th>Matricule Assuré</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Date naissance</th>
              <th>Lien</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id}>
                <td>{b.matriculeAssure}</td>
                <td>{b.nom}</td>
                <td>{b.prenom}</td>
                <td>{b.dateNais}</td>
                <td>{b.lienFamille}</td>
                <td>
                  <button onClick={() => handleEdit(b)}>📝</button>
                  <button onClick={() => handleDelete(b.id)} className="btn-delete">❌</button>
                  <button onClick={() => setSelected(b)}>👁️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

{/* MODAL */}
{selected && (
  <FicheBeneficiaireModal
    beneficiaire={selected}
    onClose={() => setSelected(null)}
    onUpdate={updated => {
      window.api.updateBeneficiaire(updated).then(() => {
        refresh()
        setSelected(null)
      })
    }}
    onDelete={id => {
      window.api.deleteBeneficiaire(id).then(() => {
        refresh()
        setSelected(null)
      })
    }}
  />
)}

{/* NON MODAL */}

        {/* {selected && (
          <FicheBeneficiaire
            beneficiaire={selected}
            onUpdate={(updated) => {
              window.api.updateBeneficiaire(updated).then(() => {
                refresh()
                setSelected(null)
              })
            }}
            onDelete={(id) => {
              window.api.deleteBeneficiaire(id).then(() => {
                refresh()
                setSelected(null)
              })
            }}
          />
        )} */}
      </div>
    </Layout>
  )
}
