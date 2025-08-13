import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

export async function exportActesToExcel(actes) {
  const wb = new ExcelJS.Workbook()
  const ws = wb.addWorksheet('Actes')

  // Entêtes
  ws.addRow([
    'ID', 'Type', 'Centre', 'Type PEC', 'Montant', 'Date', 'Matricule'
  ])

  // Données
  actes.forEach(acte => {
    ws.addRow([
      acte.id,
      acte.type,
      acte.centre,
      acte.typePEC,
      acte.montant,
      acte.date,
      acte.matricule
    ])
  })

  const buffer = await wb.xlsx.writeBuffer()
  saveAs(new Blob([buffer]), 'export_actes.xlsx')
}

export async function exportAssuresToExcel(assures) {
  const wb = new ExcelJS.Workbook()
  const ws = wb.addWorksheet('Assurés')

  // Entêtes
  ws.addRow([
    'ID', 'Matricule', 'Nom', 'Prénom', 'Date naissance', 'Catégorie', 'Situation familiale', 'Sexe'
  ])

  // Données
  assures.forEach(a => {
    ws.addRow([
      a.id,
      a.matricule,
      a.nom,
      a.prenom,
      a.dateNais,
      a.categorie,
      a.sitFamille,
      a.sexe
    ])
  })

  const buffer = await wb.xlsx.writeBuffer()
  saveAs(new Blob([buffer]), 'export_assures.xlsx')
}
