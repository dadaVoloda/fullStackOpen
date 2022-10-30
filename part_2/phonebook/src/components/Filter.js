import React from 'react'

const Filter = ({ value, changeValue, filterNames }) => {
  return (
    <div>
      <span>name: </span>
      <input
        value={value}
        onChange={(e) => {
          changeValue(e)
          filterNames()
        }}
      />
    </div>
  )
}

export default Filter
