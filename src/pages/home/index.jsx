import React from 'react'
import { Layout, Switch, Table, Typography } from 'antd'
import { defaultColumns, defaultData } from '../temp'
import ImportChoice from './import-choice'
import ImportAll from './import-all'
import { SelectMultipleAll } from './SelectMultipleAll'

const { Header, Content } = Layout
const App = () => {
  const [data, setData] = React.useState([])
  const [columns, setColumns] = React.useState([])
  const [filterColumns, setFilterColumns] = React.useState([])

  return (
    <Layout>
      <Header>Header</Header>
      <Content>
        <ImportChoice setData={setData} columns={columns} setColumns={setColumns} />
        <ImportAll setData={setData} setColumns={setColumns} />
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

  const renderedData = defaultData.map((item) => ({
    ...item,
    ...data.find((x) => x.home === item.home && x.away === item.away),
  }))

  const filteredColumns = React.useMemo(() => {
    const filtered = columns
      .filter((x) => filterColumns.includes(x.title))
      .map((x) => ({
        ...x,
        width: 100,
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
        // onCell: (record) => ({
        //   style: {
        //     backgroundColor: record.winner === record[x.dataIndex] ? '#52c41a' : '#ff4d4f',
        //   },
        // }),
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
    return filtered
  }, [columns, filterColumns, sortByWinner])
  const renderedColumns = [...defaultColumns, ...filteredColumns]

  return (
    <Table
      size="small"
      rowKey={(record) => `${record.home}-${record.away}`}
      columns={renderedColumns}
      dataSource={renderedData}
      bordered
      pagination={false}
      scroll={{ y: 500 }}
      // tableLayout="fixed"
      // sticky
      // eslint-disable-next-line
      summary={() => {
        if (!filteredColumns.length) return null
        return (
          <Table.Summary.Row>
            <Table.Summary.Cell colSpan={5}>Total</Table.Summary.Cell>
            {filteredColumns.find((x) => x.dataIndex === 'winner') && (
              <Table.Summary.Cell colSpan={1} />
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
        )
      }}
      // eslint-disable-next-line
      footer={() => (
        <Switch
          checkedChildren="Sort by winner"
          unCheckedChildren="Sort by name"
          value={sortByWinner}
          onChange={setSortByWinner}
        />
      )}
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
