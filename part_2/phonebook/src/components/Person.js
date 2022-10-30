import React from 'react'

const Person = ({ person, deleteNumber }) => {
  const { name, number, id } = person
  return (
    <div className='person'>
      {name} {number}
      <button onClick={() => deleteNumber(id)} type='button'>
        delete
      </button>
    </div>
  )
}

export default Person
