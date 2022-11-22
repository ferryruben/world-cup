import React from 'react'
import { Layout, Select, Space, Switch, Table, Typography } from 'antd'
import { defaultColumns, defaultData } from './temp'
import ImportChoice from './import-choice'
import ImportAll from './import-all'
import { SelectMultipleAll } from './SelectMultipleAll'
import './home.less'

const { Content } = Layout
const App = () => {
  const [data, setData] = React.useState([])
  const [columns, setColumns] = React.useState([])
  const [filterColumns, setFilterColumns] = React.useState([])

  return (
    <Layout>
      {/* <Header>Header</Header> */}
      <Content>
        <Space align="start">
          <ImportAll setData={setData} setColumns={setColumns} />
          <ImportChoice setData={setData} columns={columns} setColumns={setColumns} />
        </Space>
        <FilterColumns
          columns={columns}
          filterColumns={filterColumns}
          setFilterColumns={setFilterColumns}
        />
        <MainTable data={data} columns={columns} filterColumns={filterColumns} />
      </Content>
      {/* <Footer>Footer</Footer> */}
    </Layout>
  )
}
export default App

const MainTable = ({ data, columns, filterColumns }) => {
  const [sortByWinner, setSortByWinner] = React.useState(false)
  const [highlightRow, setHighlightRow] = React.useState()

  const renderedData = React.useMemo(
    () =>
      defaultData.map((item) => ({
        ...item,
        ...data.find((x) => x.home === item.home && x.away === item.away),
      })),
    [data],
  )

  const highlightOptions = React.useMemo(
    () =>
      defaultData.map((item, index) => ({
        label: `${index + 1} ${item.home} - ${item.away}`,
        value: index,
      })),
    [defaultData],
  )

  const filteredColumns = React.useMemo(() => {
    const filtered = columns
      .filter((x) => filterColumns.includes(x.title))
      // .filter((x) => !x.title.includes('Winner'))
      .map((x) => ({
        ...x,
        width: 60,
        render: (text, { winner }) => {
          if (text === winner)
            return (
              <Typography.Text strong type="success" underline>
                {text}
              </Typography.Text>
            )
          return (
            <Typography.Text strong type="danger">
              {text}
            </Typography.Text>
          )
        },
        onCell: () => {
          if (x.dataIndex === 'winner') {
            return {
              style: {
                position: 'sticky',
                left: 200,
                zIndex: 1,
                borderRight: 'double red',
              },
            }
          }
          return {}
        },
        onHeaderCell: () => {
          if (x.dataIndex === 'winner') {
            return {
              style: {
                position: 'sticky',
                left: 200,
                zIndex: 1,
                borderRight: 'double red',
              },
            }
          }
          return {}
        },
      }))
    if (sortByWinner) {
      filtered.sort((a, b) => {
        if (a.title === 'Winner') return -1
        if (b.title === 'Winner') return 1

        const getTotal = (key) =>
          renderedData.reduce((acc, record) => {
            if (record.winner === record[key.dataIndex]) return acc + 1
            return acc
          }, 0)
        return getTotal(b) - getTotal(a)
      })
    }
    if (highlightRow) {
      filtered.sort((a, b) => {
        if (a.title === 'Winner') return -1
        if (b.title === 'Winner') return 1

        return renderedData[highlightRow][b.dataIndex].localeCompare(
          renderedData[highlightRow][a.dataIndex],
        )
      })
    }
    return filtered
  }, [columns, filterColumns, sortByWinner, highlightRow, renderedData])
  const renderedColumns = [...defaultColumns, ...filteredColumns]

  const onRow = React.useCallback(
    (record, index) => ({
      onDoubleClick: () => setHighlightRow((prev) => (prev === index ? null : index)),
      className: index === highlightRow ? 'highlight-row' : '',
    }),
    [highlightRow],
  )

  return (
    <Table
      className="table-striped-rows"
      size="small"
      rowKey={(record) => `${record.home}-${record.away}`}
      columns={renderedColumns}
      dataSource={renderedData}
      bordered
      pagination={false}
      scroll={{
        y: 'calc(100vh - 200px)',
        x: 'scroll',
      }}
      // tableLayout="fixed"
      // sticky
      // eslint-disable-next-line
      summary={() => {
        if (!filteredColumns.length) return null
        return (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={2}>Total</Table.Summary.Cell>
              <Table.Summary.Cell colSpan={2} className="rows-summary-homeaway" />

              {filteredColumns.find((x) => x.dataIndex === 'winner') && (
                <Table.Summary.Cell colSpan={1} className="rows-summary-winner" />
              )}
              {filteredColumns
                .filter(({ dataIndex }) => dataIndex !== 'winner')
                .map(({ dataIndex }) => {
                  const total = renderedData.reduce((acc, record) => {
                    if (record.winner === record[dataIndex]) return acc + 1
                    return acc
                  }, 0)
                  return <Table.Summary.Cell key={dataIndex}>{total}</Table.Summary.Cell>
                })}
            </Table.Summary.Row>
          </Table.Summary>
        )
      }}
      // eslint-disable-next-line
      title={() => {
        if (!filteredColumns.length) return null

        return (
          <Space>
            <Switch
              checkedChildren="Sort by winner"
              unCheckedChildren="Sort by name"
              checked={sortByWinner}
              onChange={setSortByWinner}
            />
            <Select
              options={highlightOptions}
              value={highlightRow}
              onChange={setHighlightRow}
              placeholder="Highlight row"
              allowClear
              showSearch
              optionFilterProp="label"
              style={{ width: 150 }}
            />
          </Space>
        )
      }}
      onRow={onRow}
    />
  )
}
const FilterColumns = ({ columns, filterColumns, setFilterColumns }) => {
  const options = React.useMemo(
    () => columns.map((x) => ({ label: x.title, value: x.title })),
    [columns],
  )
  React.useEffect(() => {
    setFilterColumns(columns.map((x) => x.title))
  }, [columns])

  if (!columns.length) return null

  return (
    <SelectMultipleAll
      style={{
        width: '100%',
      }}
      options={options}
      value={filterColumns}
      onChange={setFilterColumns}
    />
  )
}
