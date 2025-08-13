import jsPDF from 'jspdf'
import 'jspdf-autotable'

export function exportActesToPDF(actes) {
  const doc = new jsPDF()

  doc.text('Liste des actes médicaux', 14, 15)
  doc.autoTable({
    startY: 20,
    head: [['Type', 'Centre', 'PEC', 'Montant', 'Matricule', 'Date']],
    body: actes.map(acte => [
      acte.type,
      acte.centre,
      acte.typePEC,
      `${acte.montant.toLocaleString()} FCFA`,
      acte.matricule,
      new Date(acte.date).toLocaleDateString()
    ]),
    styles: { fontSize: 10 },
    headStyles: { fillColor: [40, 100, 200] }
  })

  doc.save('actes_medicals.pdf')
}
