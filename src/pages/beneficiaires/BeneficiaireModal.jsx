import { useRef } from 'react'
import './BeneficiaireModal.css'
import html2pdf from 'html2pdf.js'


export default function BeneficiaireModal({ beneficiaire, onClose }) {
  const pdfRef = useRef()

  const handleExportPDF = () => {
    const element = ` <h3 style={{color:'red'}} >📄 Fiche Beneficiaire</h3>`
    // const element = pdfRef.current
    console.log(element);
    
    html2pdf()
      .set({
        margin: 0.5,
        filename: `Beneficiaire_${beneficiaire.nPolice || 'fiche'}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
       
      })
      .from(element)
      .save()
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content fiche-modal">
        <div className="fiche-actions">
          <h3>📄 Fiche Beneficiaire</h3>
          <div>
            <button onClick={handleExportPDF}>📤 Exporter en PDF</button>
            <button onClick={onClose}>❌ Fermer</button>
          </div>
        </div>

        <div className="fiche-body" ref={pdfRef}>
          <div className="fiche-grid">
            <p><strong>Assureur:</strong> {beneficiaire.assureur}</p>
            <p><strong>Police:</strong> {beneficiaire.nPolice}</p>
            <p><strong>Souscripteur:</strong> {beneficiaire.souscripteur}</p>
            <p><strong>Profession:</strong> {beneficiaire.profession}</p>
            <p><strong>Adresse:</strong> {beneficiaire.adresse}</p>
            <p><strong>Validité:</strong> {beneficiaire.validite_du} → {beneficiaire.validite_au}</p>
            <p><strong>Immatriculation:</strong> {beneficiaire.immat_moteur}</p>
            <p><strong>Marque:</strong> {beneficiaire.marque}</p>
            <p><strong>Catégorie:</strong> {beneficiaire.categorie_usage}</p>
            <p><strong>Prime TTC:</strong> {beneficiaire.prime_ttc?.toLocaleString()} FCFA</p>
            <p><strong>Qui a saisi :</strong> {beneficiaire.qui_saisie}</p>
            <p><strong>Date de saisie:</strong> {beneficiaire.date_saisie}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
