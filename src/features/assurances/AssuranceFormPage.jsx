import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import AssuranceForm from './AssuranceForm'
import Layout from '../../components/layout/Layout'

const emptyForm = {
  id: null, nordre: '', nCarton: '', nAssure: '', nPolice: '', souscripteur: '',
  profession: '', adresse: '', echeance: '', validite_du: '', validite_au: '',
  prise_effet: '', genre: '', marque: '', immat_moteur: '', categorie_usage: '',
  expirer: false, date_saisie: '', qui_saisie: '', assureur: '', prime_ttc: ''
}

export default function AssuranceFormPage({ mode }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const isEdit = mode === 'edit'

  useEffect(() => {
    if (isEdit && id) {
      window.api.getAssuranceById(parseInt(id)).then(setForm)
    }
  }, [isEdit, id])

  const handleSubmit = async () => {
    if (isEdit) {
      await window.api.updateAssurances(form)
    } else {
      await window.api.addAssurances(form)
    }
    navigate('/assurances')
  }

  return (
    <Layout>
      <AssuranceForm
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        editing={isEdit}
        setEditing={() => {}}
      />
    </Layout>
  )
}
