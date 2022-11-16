import React from 'react'
import { Button, Form, Input, message, Space, Typography, Upload } from 'antd'
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  ImportOutlined,
  PicLeftOutlined,
  QuestionOutlined,
} from '@ant-design/icons'
import { read, utils } from 'xlsx'

// import single choice
const ImportChoice = ({ columns, setColumns, setData }) => {
  const [jsonObj, setJsonObj] = React.useState()
  const [visibleJson, setVisibleJson] = React.useState(false)
  const [isPrettify, setIsPrettify] = React.useState(false)

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

      const onSuccess = (json) => setJsonObj(json)

      const onError = () => message.error('error importing')
      readXlsxChoice(file, onSuccess, onError)

      return false // disable direct upload
    },
  }

  const onSubmitSet = ({ name }) => {
    // replace space with underscore and set to lowercase
    const keyColumn = name.replace(/\s/g, '_').toLowerCase()

    if (columns.find((item) => item.dataIndex === keyColumn)) {
      message.error('name already exists, data in table replaced')
      // return
    } else {
      setColumns((prev) => [
        ...prev,
        {
          title: name,
          dataIndex: keyColumn,
        },
      ])
    }

    setData((prev) => {
      if (prev.length === 0) return jsonObj.map((x) => ({ ...x, [keyColumn]: x.choice }))
      return prev.map((item) => ({
        ...item,
        [name]: jsonObj.find((newItem) => newItem.home === item.home && newItem.away === item.away)
          .choice,
      }))
    })
    setJsonObj() // clear json object
  }

  return (
    <div style={{ display: 'flex' }}>
      <Upload {...props}>
        <Button icon={<ImportOutlined />}>Import Choice .xlsx</Button>
      </Upload>
      {jsonObj && (
        <>
          <Space direction="vertical" size={0}>
            <Button
              icon={visibleJson ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              onClick={() => setVisibleJson((v) => !v)}
            >
              {visibleJson ? 'Hide ' : 'Show JSON'}
            </Button>
            <Form onFinish={onSubmitSet}>
              <Form.Item name="name" rules={[{ required: true }]}>
                <Input placeholder="name" />
              </Form.Item>
              <Button icon={<QuestionOutlined />} htmlType="submit">
                Set to table
              </Button>
            </Form>
            <Button onClick={() => setJsonObj()}>Cancel</Button>
          </Space>

          {visibleJson && (
            <>
              <Button onClick={() => setIsPrettify((v) => !v)} icon={<PicLeftOutlined />}>
                Pretty
              </Button>

              {isPrettify ? (
                <div style={{ overflow: 'auto', maxHeight: 200 }}>
                  <Typography.Paragraph style={{ whiteSpace: 'pre' }}>
                    {JSON.stringify(jsonObj, null, 4)}
                  </Typography.Paragraph>
                </div>
              ) : (
                JSON.stringify(jsonObj, null, 4)
              )}
            </>
          )}
        </>
      )}
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
      range: 1,
      // defval: '',
      // blankrows: false,
    })

    // convert json to array of object
    const convertedJson = json.map(([, , home, , , away, choice]) => ({
      home,
      away,
      choice,
    }))

    onSuccess(convertedJson)
  }
  reader.onerror = onError
  reader.readAsBinaryString(file)
}

export default ImportChoice
