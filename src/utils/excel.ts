import XLSX from 'xlsx'

export function exportData<T = Record<string, unknown>>(list: T[]) {
  const firstUser = list.length ? list[0] : null
  const data: string[][] = []
  if (firstUser) {
    const columnTitles = Object.keys(firstUser)
    data.push(columnTitles)
    list.forEach((u) => {
      const rows: string[] = []
      columnTitles.forEach((t) => {
        const item = u[t as keyof typeof u]
        rows.push(item ? JSON.stringify(item) : '')
      })
      data.push(rows)
    })
  }
  const sheet = XLSX.utils.aoa_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, sheet, '用户信息')
  // XLSX.writeFile(workbook, '用户信息.xlsx')
  const wopts: XLSX.WritingOptions = {
    bookType: 'xlsx',
    bookSST: false,
    type: 'array',
  }
  const wbout = XLSX.write(workbook, wopts)
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '用户信息.xlsx')
}
