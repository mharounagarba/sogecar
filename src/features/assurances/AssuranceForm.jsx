import { useNavigate } from 'react-router-dom'
import './AssuranceForm.css'

export default function AssuranceForm({ form, setForm, onSubmit, editing, setEditing }) {
  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }
const navigate = useNavigate()

  const handleReset = () => {
    setForm({
      id: null, nordre: '', nCarton: '', nAssure: '', nPolice: '', souscripteur: '',
      profession: '', adresse: '', echeance: '', validite_du: '', validite_au: '',
      prise_effet: '', genre: '', marque: '', immat_moteur: '', categorie_usage: '',
      expirer: true, date_saisie: '', qui_saisie: '', assureur: '', prime_ttc: ''
    })
    setEditing(false)
    navigate(-1)
  }

  const fields = [
    { name: 'nordre', label: 'N° Ordre' },
    { name: 'nCarton', label: 'N° Carton' },
    { name: 'nAssure', label: 'N° Assuré' },
    { name: 'nPolice', label: 'N° Police', required: true },
    { name: 'souscripteur', label: 'Souscripteur' },
    { name: 'profession', label: 'Profession' },
    { name: 'adresse', label: 'Adresse' },
    { name: 'echeance', label: 'Échéance', type: 'number' },
    { name: 'validite_du', label: 'Validité du', type: 'date' },
    { name: 'validite_au', label: 'Validité au', type: 'date' },
    { name: 'prise_effet', label: 'Prise d’effet', type: 'date' },
    { name: 'genre', label: 'Genre' },
    { name: 'marque', label: 'Marque' },
    { name: 'immat_moteur', label: 'Immatriculation / Moteur' },
    { name: 'categorie_usage', label: 'Catégorie / Usage' },
    { name: 'date_saisie', label: 'Date de saisie', type: 'date' },
    { name: 'qui_saisie', label: 'Qui a saisi ?' },
    { name: 'assureur', label: 'Assureur' },
    { name: 'prime_ttc', label: 'Prime TTC', type: 'number' }
  ]

  return (
    <form className="assurance-form" onSubmit={e => { e.preventDefault(); onSubmit() }}>
      <h3>{editing ? '✏️ Modifier une assurance' : '➕ Nouvelle assurance'}</h3>

      <div className="form-flex">
        {fields.map(f => (
          <div key={f.name} className="input-wrapper">
            <input
            
              name={f.name}
              type={f.type || 'text'}
              value={form[f.name]}
              onChange={handleChange}
              required={f.required}
              placeholder=" "
            />
            <label>{f.label}</label>
          </div>
        ))}

        <div className="input-wrapper checkbox">
          <label>
            <input
              type="checkbox"
              name="expirer"
              checked={form.expirer}
              onChange={handleChange}
            />
            Expiré
          </label>
        </div>
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn-primary">{editing ? '💾 Modifier' : '➕ Ajouter'}</button>
        {editing && <button type="button" onClick={handleReset} className="btn-secondary">🔄 Annuler</button>}
      </div>
    </form>
  )
}
