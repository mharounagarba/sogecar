import { useParams } from 'react-router-dom'
import FicheAssure from './FicheAssure'

export default function FicheAssureWrapper() {
  const { matricule } = useParams()
  return <FicheAssure matricule={matricule} />
}
