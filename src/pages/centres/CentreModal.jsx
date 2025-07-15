import { useRef } from 'react'
import './CentreModal.css'
import html2pdf from 'html2pdf.js'


export default function CentreModal({ centre, onClose }) {
  const pdfRef = useRef()

  const handleExportPDF = () => {
    const element = ` <h3 style={{color:'red'}} >📄 Fiche Centre</h3>`
    // const element = pdfRef.current
    console.log(element);
    
    html2pdf()
      .set({
        margin: 0.5,
        filename: `Centre_${centre.nPolice || 'fiche'}.pdf`,
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
          <h3>📄 Fiche Centre</h3>
          <div>
            <button onClick={handleExportPDF}>📤 Exporter en PDF</button>
            <button onClick={onClose}>❌ Fermer</button>
          </div>
        </div>

        <div className="fiche-body" ref={pdfRef}>
          <div className="fiche-grid">
            <p><strong>Assureur:</strong> {centre.assureur}</p>
            <p><strong>Police:</strong> {centre.nPolice}</p>
            <p><strong>Souscripteur:</strong> {centre.souscripteur}</p>
            <p><strong>Profession:</strong> {centre.profession}</p>
            <p><strong>Adresse:</strong> {centre.adresse}</p>
            <p><strong>Validité:</strong> {centre.validite_du} → {centre.validite_au}</p>
            <p><strong>Immatriculation:</strong> {centre.immat_moteur}</p>
            <p><strong>Marque:</strong> {centre.marque}</p>
            <p><strong>Catégorie:</strong> {centre.categorie_usage}</p>
            <p><strong>Prime TTC:</strong> {centre.prime_ttc?.toLocaleString()} FCFA</p>
            <p><strong>Qui a saisi :</strong> {centre.qui_saisie}</p>
            <p><strong>Date de saisie:</strong> {centre.date_saisie}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
