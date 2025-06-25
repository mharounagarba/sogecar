import jsPDF from 'jspdf'
import 'jspdf-autotable'

export function exportAssurancesToPDF(assurance) {
  const doc = new jsPDF()

  doc.setFontSize(18)
  doc.text('Fiche d’Assurance', 14, 20)

  const data = Object.entries(assurance).map(([key, value]) => [
    key, String(value ?? '')
  ])

  doc.autoTable({
    startY: 30,
    head: [['Champ', 'Valeur']],
    body: data
  })

  doc.save(`Assurance-${assurance.nPolice || 'fiche'}.pdf`)
}
