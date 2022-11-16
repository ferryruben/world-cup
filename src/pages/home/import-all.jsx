import React from 'react'
import { Button, message, Upload } from 'antd'
import { ImportOutlined } from '@ant-design/icons'
import { read, utils } from 'xlsx'

// import single choice
const ImportAll = ({ setColumns, setData }) => {
  // const [jsonObj, setJsonObj] = React.useState()
  // const [visibleJson, setVisibleJson] = React.useState(false)
  // const [isPrettify, setIsPrettify] = React.useState(false)

  const props = {
    accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    maxCount: 1,
    itemRender: () => null,
    beforeUpload: (file) => {
      const isValid = file.type.endsWith(
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      )
      if (!isValid) {
        message.error(`${file.name} is not a valid file`)
        return false || Upload.LIST_IGNORE
      }

      const onSuccess = ([columns, data]) => {
        setColumns(columns)
        setData(data)
      }

      const onError = () => message.error('error importing')
      readXlsxChoice(file, onSuccess, onError)

      return false // disable direct upload
    },
  }

  return (
    <div style={{ display: 'flex' }}>
      <Upload {...props}>
        <Button icon={<ImportOutlined />}>Import All</Button>
      </Upload>
    </div>
  )
}

const readXlsxChoice = (file, onSuccess, onError) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    const data = e.target.result
    const workbook = read(data, { type: 'binary' })
    console.log('workbook', workbook)

    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const json = utils.sheet_to_json(sheet, {
      header: 1, // item is array
      raw: false,
      // range: 1,
      // defval: '',
      // blankrows: false,
    })

    // dummy
    // [{
    //     date: '2021-01-01',
    //     time: '12:00',
    //     home: "Qatar",
    //     away: "Ecuador",
    //     ben: "Home",
    //     andri: "Home",
    // }]

    const [header, , ...rest] = json
    // skip index <6 and empty item
    const convertedHeader = header
      .filter((item, index) => {
        if (index < 6) return false
        if (!item) return false
        return true
      })
      .map((item) => ({
        title: item,
        dataIndex: item.replace(/\s/g, '_').toLowerCase(),
      }))
    // sort by title except "Winner" is at first
    convertedHeader.sort((a, b) => {
      if (a.title === 'Winner') return -1
      if (b.title === 'Winner') return 1
      return a.title.localeCompare(b.title)
    })

    const convertedData = rest
      .filter((item) => item.length > 0)
      .map((x) => {
        const temp = {
          date: x[0],
          time: x[1],
          home: x[2],
          away: x[5],
          // [name]: x[index],
        }
        header.forEach((y, index) => {
          if (index > 5) {
            const key = y.toLowerCase().replace(/\s/g, '_')
            temp[key] = x[index]
          }
        })
        return temp
      })
      .sort((a, b) => a.datetime - b.datetime)

    onSuccess([convertedHeader, convertedData])
  }
  reader.onerror = onError
  reader.readAsBinaryString(file)
}

export default ImportAll
