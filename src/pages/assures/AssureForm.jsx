import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../../components/layout/Layout'

import Title from '../../components/title/Title'
import fields from './assureFields'
import FormEngine from '../../components/inputbox/FormEngine'

const emptyForm = Object.fromEntries(fields.map(f => [f.name, f.type === 'checkbox' ? false : '']))

export default function AssureForm({ mode }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const [form, setForm] = useState(emptyForm)
  const isEdit = mode === 'edit'

  useEffect(() => {
    if (isEdit && id) {
      window.api.getAssureById(parseInt(id)).then(setForm)
    }
  }, [isEdit, id])

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (isEdit) await window.api.updateAssure(form)
    else await window.api.addAssure(form)
    navigate('/assures')
  }

  return (
    <Layout>
      <form className="standard-form" onSubmit={handleSubmit}>
        <Title name={isEdit ? 'Modification assure' : 'Nouveau assure'} />
        <FormEngine fields={fields} form={form} handleChange={handleChange} />
        <div className="form-buttons">
          <button type="submit" className="btn-primary">💾 {isEdit ? 'Mettre à jour' : 'Enregistrer'}</button>
          <button type="button" onClick={() => navigate(-1)} className="btn-secondary">Annuler</button>
        </div>
      </form>
    </Layout>
  )
}
