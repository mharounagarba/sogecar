import { useRef } from 'react'
import './AssureModal.css'
import html2pdf from 'html2pdf.js'


export default function AssureModal({ assure, onClose }) {
  const pdfRef = useRef()

  const handleExportPDF = () => {
    const element = ` <h3 style={{color:'red'}} >📄 Fiche Assure</h3>`
    // const element = pdfRef.current
    console.log(element);
    
    html2pdf()
      .set({
        margin: 0.5,
        filename: `Assure_${assure.nPolice || 'fiche'}.pdf`,
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
          <h3>📄 Fiche Assure</h3>
          <div>
            <button onClick={handleExportPDF}>📤 Exporter en PDF</button>
            <button onClick={onClose}>❌ Fermer</button>
          </div>
        </div>

        <div className="fiche-body" ref={pdfRef}>
          <div className="fiche-grid">
            <p><strong>Assureur:</strong> {assure.assureur}</p>
            <p><strong>Police:</strong> {assure.nPolice}</p>
            <p><strong>Souscripteur:</strong> {assure.souscripteur}</p>
            <p><strong>Profession:</strong> {assure.profession}</p>
            <p><strong>Adresse:</strong> {assure.adresse}</p>
            <p><strong>Validité:</strong> {assure.validite_du} → {assure.validite_au}</p>
            <p><strong>Immatriculation:</strong> {assure.immat_moteur}</p>
            <p><strong>Marque:</strong> {assure.marque}</p>
            <p><strong>Catégorie:</strong> {assure.categorie_usage}</p>
            <p><strong>Prime TTC:</strong> {assure.prime_ttc?.toLocaleString()} FCFA</p>
            <p><strong>Qui a saisi :</strong> {assure.qui_saisie}</p>
            <p><strong>Date de saisie:</strong> {assure.date_saisie}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
