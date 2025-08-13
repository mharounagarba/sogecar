// src/utils/exportAssurancesPDF.js
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export function exportAssurancesToPDF(assurances) {
  const doc = new jsPDF()

  doc.text('Liste des Assurances', 14, 10)
  
  autoTable(doc, {
    startY: 20,
    head: [[
      'ID', 'N° Ordre', 'N° Carton', 'Assuré', 'Police', 'Souscripteur',
      'Validité', 'Genre', 'Marque', 'Immatriculation', 'Assureur', 'Prime TTC'
    ]],
    body: assurances.map(a => [
      a.id, a.nordre, a.nCarton, a.nAssure, a.nPolice, a.souscripteur,
      `${a.validite_du} au ${a.validite_au}`, a.genre, a.marque,
      a.immat_moteur, a.assureur, `${a.prime_ttc} FCFA`
    ])
  })

  doc.save('assurances_export.pdf')
}
