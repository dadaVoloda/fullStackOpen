import React from 'react'

const PersonForm = ({ name, number, changeName, changeNumber, addNumber }) => {
  return (
    <form onSubmit={addNumber}>
      <div className='input'>
        name: <input value={name} onChange={changeName} />
      </div>
      <div className='input'>
        number: <input value={number} onChange={changeNumber} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

export default PersonForm
