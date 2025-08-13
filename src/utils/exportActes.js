// src/utils/exportAssurances.js
import * as XLSX from 'xlsx'

export function exportActesToExcel(assurances) {
  const ws = XLSX.utils.json_to_sheet(assurances)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Assurances')
  XLSX.writeFile(wb, 'assurances_export.xlsx')
}
