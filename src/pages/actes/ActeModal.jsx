import { useRef } from 'react'
import './ActeModal.css'
import html2pdf from 'html2pdf.js'


export default function ActeModal({ acte, onClose }) {
  const pdfRef = useRef()

  const handleExportPDF = () => {
    const element = ` <h3 style={{color:'red'}} >📄 Fiche Acte</h3>`
    // const element = pdfRef.current
    console.log(element);
    
    html2pdf()
      .set({
        margin: 0.5,
        filename: `Acte_${acte.nPolice || 'fiche'}.pdf`,
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
          <h3>📄 Fiche Acte</h3>
          <div>
            <button onClick={handleExportPDF}>📤 Exporter en PDF</button>
            <button onClick={onClose}>❌ Fermer</button>
          </div>
        </div>

        <div className="fiche-body" ref={pdfRef}>
          <div className="fiche-grid">
            <p><strong>Assureur:</strong> {acte.assureur}</p>
            <p><strong>Police:</strong> {acte.nPolice}</p>
            <p><strong>Souscripteur:</strong> {acte.souscripteur}</p>
            <p><strong>Profession:</strong> {acte.profession}</p>
            <p><strong>Adresse:</strong> {acte.adresse}</p>
            <p><strong>Validité:</strong> {acte.validite_du} → {acte.validite_au}</p>
            <p><strong>Immatriculation:</strong> {acte.immat_moteur}</p>
            <p><strong>Marque:</strong> {acte.marque}</p>
            <p><strong>Catégorie:</strong> {acte.categorie_usage}</p>
            <p><strong>Prime TTC:</strong> {acte.prime_ttc?.toLocaleString()} FCFA</p>
            <p><strong>Qui a saisi :</strong> {acte.qui_saisie}</p>
            <p><strong>Date de saisie:</strong> {acte.date_saisie}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
