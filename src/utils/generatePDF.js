import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { saveAs } from 'file-saver'

export async function generateActePDF(acte) {
  const doc = await PDFDocument.create()
  const page = doc.addPage([400, 300])
  const font = await doc.embedFont(StandardFonts.Helvetica)

  const drawText = (text, y) => {
    page.drawText(text, {
      x: 30,
      y,
      size: 12,
      font,
      color: rgb(0.1, 0.1, 0.1)
    })
  }

  drawText('🧾 Reçu de prise en charge', 260)
  drawText(`Type: ${acte.type}`, 220)
  drawText(`Centre: ${acte.centre}`, 200)
  drawText(`Type PEC: ${acte.typePEC}`, 180)
  drawText(`Montant: ${acte.montant.toLocaleString()} FCFA`, 160)
  drawText(`Date: ${acte.date}`, 140)
  drawText(`Matricule: ${acte.matricule}`, 120)

  const pdfBytes = await doc.save()
  saveAs(new Blob([pdfBytes]), `recu_PEC_${acte.matricule}.pdf`)
}
