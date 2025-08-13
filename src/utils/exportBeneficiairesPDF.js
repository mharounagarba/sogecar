import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export function exportBeneficiairesToPDF(data) {
  const doc = new jsPDF()

  doc.text('Liste des Bénéficiaires', 14, 14)

  autoTable(doc, {
    head: [['Matricule Assuré', 'Nom', 'Prénom', 'Naissance', 'Lien']],
    body: data.map(b => [
      b.matriculeAssure,
      b.nom,
      b.prenom,
      b.dateNais || '',
      b.lienFamille
    ]),
  })

  doc.save('beneficiaires.pdf')
}
