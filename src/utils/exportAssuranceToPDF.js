import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export function exportAssuranceToPDF(assurance) {
  const doc = new jsPDF()

  doc.setFontSize(18)
  doc.text('Fiche d’Assurance', 154, 20)

  const data = Object.entries(assurance).map(([key, value]) => [
    key, String(value ?? '')
  ])

  autoTable(doc,{
    startY: 30,
    head: [['Champ', 'Valeur']],
    body: data
  })

  doc.save(`Assurance-${assurance.nPolice || 'fiche'}.pdf`)
}
