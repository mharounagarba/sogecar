import { useRef } from 'react'
import './ClientModal.css'
import html2pdf from 'html2pdf.js'


export default function ClientModal({ client, onClose }) {
  const pdfRef = useRef()

  const handleExportPDF = () => {
    const element = ` <h3 style={{color:'red'}} >📄 Fiche Client</h3>`
    // const element = pdfRef.current
    console.log(element);
    
    html2pdf()
      .set({
        margin: 0.5,
        filename: `Client_${client.nPolice || 'fiche'}.pdf`,
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
          <h3>📄 Fiche Client</h3>
          <div>
            <button onClick={handleExportPDF}>📤 Exporter en PDF</button>
            <button onClick={onClose}>❌ Fermer</button>
          </div>
        </div>

        <div className="fiche-body" ref={pdfRef}>
          <div className="fiche-grid">
            <p><strong>Assureur:</strong> {client.assureur}</p>
            <p><strong>Police:</strong> {client.nPolice}</p>
            <p><strong>Souscripteur:</strong> {client.souscripteur}</p>
            <p><strong>Profession:</strong> {client.profession}</p>
            <p><strong>Adresse:</strong> {client.adresse}</p>
            <p><strong>Validité:</strong> {client.validite_du} → {client.validite_au}</p>
            <p><strong>Immatriculation:</strong> {client.immat_moteur}</p>
            <p><strong>Marque:</strong> {client.marque}</p>
            <p><strong>Catégorie:</strong> {client.categorie_usage}</p>
            <p><strong>Prime TTC:</strong> {client.prime_ttc?.toLocaleString()} FCFA</p>
            <p><strong>Qui a saisi :</strong> {client.qui_saisie}</p>
            <p><strong>Date de saisie:</strong> {client.date_saisie}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
