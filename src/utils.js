import XLSX from 'xlsx'

export const ImportToJson = (file, onSuccess, onError) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    onSuccess([[], []]) // set empty table
    const data = e.target.result
    const workbook = XLSX.read(data, { type: 'binary' })

    const arrJson = workbook.SheetNames.map((sheetName) => {
      const sheet = workbook.Sheets[sheetName]
      const json = XLSX.utils.sheet_to_json(sheet)
      return json
    })
    onSuccess(arrJson)
  }
  reader.onerror = onError
  reader.readAsBinaryString(file)
}

export default ImportToJson
