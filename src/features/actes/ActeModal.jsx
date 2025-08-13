import './ActeModal.css'

export default function ActeModal({ acte, onClose, onDelete, onUpdate }) {
  const handleUpdate = () => {
    const nouveauMontant = prompt("Nouveau montant ?", acte.montant)
    if (nouveauMontant) {
      onUpdate({ ...acte, montant: parseFloat(nouveauMontant) })
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>🧾 Détails de l'acte</h3>
        <p><strong>Type :</strong> {acte.type}</p>
        <p><strong>Centre :</strong> {acte.centre}</p>
        <p><strong>Type PEC :</strong> {acte.typePEC}</p>
        <p><strong>Montant :</strong> {acte.montant.toLocaleString()} FCFA</p>
        <p><strong>Matricule :</strong> {acte.matricule}</p>
        <p><strong>Date :</strong> {new Date(acte.date).toLocaleDateString()}</p>

        <div className="modal-actions">
          <button onClick={handleUpdate}>✏️ Modifier</button>
          <button onClick={() => onDelete(acte.id)}>🗑 Supprimer</button>
          <button onClick={onClose}>❌ Fermer</button>
        </div>
      </div>
    </div>
  )
}
