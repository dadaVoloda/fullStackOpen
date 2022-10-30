import React from 'react'
import Person from './Person'

const Persons = ({ persons, deleteNumber }) => {
  return (
    <>
      {persons.map((person) => (
        <Person key={person.id} person={person} deleteNumber={deleteNumber} />
      ))}
    </>
  )
}

export default Persons
