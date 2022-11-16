import React from 'react'
import { Select } from 'antd'

const defaultOptionAll = { value: 'all', label: 'All' }
export const SelectMultipleAll = ({
  value,
  onChange = () => {},
  optionAll = defaultOptionAll,
  options,
  ...props
}) => {
  const onChangeSelect = (v) => {
    const valueOptionAll = optionAll.value
    if (v && v.length && v.includes(valueOptionAll)) {
      // #deselect all
      if (v.length === options.length + 1) onChange([])
      // #select all
      else onChange([...options.map((x) => x.value)])
    }
    // #select one
    else onChange(v)
  }

  return (
    <Select
      value={value}
      onChange={onChangeSelect}
      options={[optionAll].concat(options)}
      optionFilterProp="label"
      mode="multiple"
      maxTagCount="responsive"
      {...props}
    />
  )
}

export default SelectMultipleAll
