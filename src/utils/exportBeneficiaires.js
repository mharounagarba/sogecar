import * as XLSX from 'xlsx'

export function exportBeneficiairesToExcel(data) {
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Bénéficiaires')

  XLSX.writeFile(wb, 'beneficiaires.xlsx')
}
