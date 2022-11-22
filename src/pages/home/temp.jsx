import React from 'react'
import { Typography } from 'antd'

export const defaultColumns = [
  {
    title: 'No.',
    render: (text, record, index) => index + 1,
    width: 30,
  },
  {
    title: 'Date',
    // dataIndex: 'date',
    render: ({ date, time }) => `${date} ${time}`,
    width: 100,
  },
  // {
  //   title: 'Time',
  //   dataIndex: 'time',
  //   width: 100,
  //   fixed: 'left',
  // },
  {
    title: 'Home',
    dataIndex: 'home',
    width: 100,
    render: (text, { winner }) => {
      if (winner === 'Home')
        return (
          <Typography.Text type="success" underline>
            {text}
          </Typography.Text>
        )
      if (winner === 'Draw')
        return (
          <Typography.Text type="warning" underline>
            {text}
          </Typography.Text>
        )
      return text
    },
    onCell: () => ({
      style: {
        position: 'sticky',
        left: 0,
        zIndex: 1,
      },
    }),
    onHeaderCell: () => ({
      style: {
        position: 'sticky',
        left: 0,
        zIndex: 1,
      },
    }),
  },
  {
    title: 'Away',
    dataIndex: 'away',
    width: 100,
    render: (text, { winner }) => {
      if (winner === 'Away')
        return (
          <Typography.Text type="success" underline>
            {text}
          </Typography.Text>
        )
      if (winner === 'Draw')
        return (
          <Typography.Text type="warning" underline>
            {text}
          </Typography.Text>
        )
      return text
    },
    onCell: () => ({
      style: {
        position: 'sticky',
        left: 100,
        zIndex: 1,
      },
    }),
    onHeaderCell: () => ({
      style: {
        position: 'sticky',
        left: 100,
        zIndex: 1,
      },
    }),
  },
  // {
  //   title: 'Result',
  //   dataIndex: 'result',
  // },
]

export const rawData = [
  ['20-Nov', '23:00', 'Qatar', null, null, 'Ecuador', 'Away'],
  ['21-Nov', '23:00', 'Senegal', null, null, 'Netherlands', 'Away'],
  ['21-Nov', '20:00', 'England', null, null, 'Iran', 'Home'],
  ['22-Nov', '02:00', 'United States', null, null, 'Wales', 'Away'],
  ['22-Nov', '17:00', 'Argentina', null, null, 'Saudi Arabia', 'Home'],
  ['22-Nov', '20:00', 'Denmark', null, null, 'Tunisia', 'Home'],
  ['22-Nov', '23:00', 'Mexico', null, null, 'Poland', 'Draw'],
  ['23-Nov', '02:00', 'France', null, null, 'Australia', 'Home'],
  ['23-Nov', '17:00', 'Morocco', null, null, 'Croatia', 'Away'],
  ['23-Nov', '20:00', 'Germany', null, null, 'Japan', 'Home'],
  ['23-Nov', '23:00', 'Spain', null, null, 'Costa Rica', 'Home'],
  ['24-Nov', '02:00', 'Belgium', null, null, 'Canada', 'Home'],
  ['24-Nov', '17:00', 'Switzerland', null, null, 'Cameroon', 'Home'],
  ['24-Nov', '20:00', 'Uruguay', null, null, 'Korea Republic', 'Home'],
  ['24-Nov', '23:00', 'Portugal', null, null, 'Ghana', 'Home'],
  ['25-Nov', '02:00', 'Brazil', null, null, 'Serbia', 'Home'],
  ['25-Nov', '17:00', 'Wales', null, null, 'Iran', 'Home'],
  ['25-Nov', '20:00', 'Qatar', null, null, 'Senegal', 'Away'],
  ['25-Nov', '23:00', 'Netherlands', null, null, 'Ecuador', 'Home'],
  ['26-Nov', '02:00', 'England', null, null, 'United States', 'Home'],
  ['26-Nov', '17:00', 'Tunisia', null, null, 'Australia', 'Draw'],
  ['26-Nov', '20:00', 'Poland', null, null, 'Saudi Arabia', 'Home'],
  ['26-Nov', '23:00', 'France', null, null, 'Denmark', 'Home'],
  ['27-Nov', '02:00', 'Argentina', null, null, 'Mexico', 'Home'],
  ['27-Nov', '17:00', 'Japan', null, null, 'Costa Rica', 'Home'],
  ['27-Nov', '20:00', 'Belgium', null, null, 'Morocco', 'Home'],
  ['27-Nov', '23:00', 'Croatia', null, null, 'Canada', 'Home'],
  ['28-Nov', '02:00', 'Spain', null, null, 'Germany', 'Home'],
  ['28-Nov', '17:00', 'Cameroon', null, null, 'Serbia', 'Away'],
  ['28-Nov', '20:00', 'Korea Republic', null, null, 'Ghana', 'Draw'],
  ['28-Nov', '23:00', 'Brazil', null, null, 'Switzerland', 'Home'],
  ['29-Nov', '02:00', 'Portugal', null, null, 'Uruguay', 'Home'],
  ['29-Nov', '22:00', 'Ecuador', null, null, 'Senegal', 'Draw'],
  ['29-Nov', '22:00', 'Netherlands', null, null, 'Qatar', 'Home'],
  ['30-Nov', '02:00', 'Wales', null, null, 'England', 'Away'],
  ['30-Nov', '02:00', 'Iran', null, null, 'United States', 'Away'],
  ['30-Nov', '22:00', 'Australia', null, null, 'Denmark', 'Away'],
  ['30-Nov', '22:00', 'Tunisia', null, null, 'France', 'Away'],
  ['01-Dec', '02:00', 'Poland', null, null, 'Argentina', 'Away'],
  ['01-Dec', '02:00', 'Saudi Arabia', null, null, 'Mexico', 'Away'],
  ['01-Dec', '22:00', 'Croatia', null, null, 'Belgium', 'Away'],
  ['01-Dec', '22:00', 'Canada', null, null, 'Morocco', 'Away'],
  ['02-Dec', '02:00', 'Japan', null, null, 'Spain', 'Away'],
  ['02-Dec', '02:00', 'Costa Rica', null, null, 'Germany', 'Away'],
  ['02-Dec', '22:00', 'Ghana', null, null, 'Uruguay', 'Away'],
  ['02-Dec', '22:00', 'Korea Republic', null, null, 'Portugal', 'Away'],
  ['03-Dec', '02:00', 'Serbia', null, null, 'Switzerland', 'Draw'],
  ['03-Dec', '02:00', 'Cameroon', null, null, 'Brazil', 'Away'],
  [null, null, null, null, null, null, '48'],
  [null, null, null, null, null, null, '24'],
  [null, null, null, null, null, null, '5'],
  [null, null, null, null, null, null, '19'],
]
export const defaultData = rawData
  .filter((d) => d[0]) // remove null date
  .map(([date, time, home, homeScore, awayScore, away]) => ({
    datetime: new Date(`${date}-2022 ${time}`),
    date,
    time,
    home,
    homeScore,
    awayScore,
    away,
    result: '',
  }))
  .sort((a, b) => a.datetime - b.datetime)

export const getChoice = (dd) =>
  dd
    .filter((d) => d[0]) // remove null date
    .map(([date, time, home, homeScore, awayScore, away]) => ({
      datetime: new Date(`${date}-2022 ${time}`),
      date,
      time,
      home,
      homeScore,
      awayScore,
      away,
      result: '',
    }))
