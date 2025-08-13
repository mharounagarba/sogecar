import { useRef } from 'react'
import './FicheAssuranceModal.css'
import html2pdf from 'html2pdf.js'


export default function FicheAssuranceModal({ assurance, onClose }) {
  const pdfRef = useRef()

  const handleExportPDF = () => {
    const element = ` <h3 style={{color:'red'}} >📄 Fiche Assurance</h3>`
    // const element = pdfRef.current
    console.log(element);
    
    html2pdf()
      .set({
        margin: 0.5,
        filename: `Assurance_${assurance.nPolice || 'fiche'}.pdf`,
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
          <h3>📄 Fiche Assurance</h3>
          <div>
            <button onClick={handleExportPDF}>📤 Exporter en PDF</button>
            <button onClick={onClose}>❌ Fermer</button>
          </div>
        </div>

        <div className="fiche-body" ref={pdfRef}>
          <div className="fiche-grid">
            <p><strong>Assureur:</strong> {assurance.assureur}</p>
            <p><strong>Police:</strong> {assurance.nPolice}</p>
            <p><strong>Souscripteur:</strong> {assurance.souscripteur}</p>
            <p><strong>Profession:</strong> {assurance.profession}</p>
            <p><strong>Adresse:</strong> {assurance.adresse}</p>
            <p><strong>Validité:</strong> {assurance.validite_du} → {assurance.validite_au}</p>
            <p><strong>Immatriculation:</strong> {assurance.immat_moteur}</p>
            <p><strong>Marque:</strong> {assurance.marque}</p>
            <p><strong>Catégorie:</strong> {assurance.categorie_usage}</p>
            <p><strong>Prime TTC:</strong> {assurance.prime_ttc?.toLocaleString()} FCFA</p>
            <p><strong>Qui a saisi :</strong> {assurance.qui_saisie}</p>
            <p><strong>Date de saisie:</strong> {assurance.date_saisie}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
