import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationType, setNotificationType] = useState('')

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const changeName = (e) => {
    setNewName(e.target.value)
  }
  const changeNumber = (e) => {
    setNewNumber(e.target.value)
  }
  const changeFilterValue = (e) => {
    setFilterValue(e.target.value)
  }
  const cleanInputs = () => {
    setNewName('')
    setNewNumber('')
  }
  const showNotification = (message, type = 'success') => {
    setNotificationMessage(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotificationMessage('')
      setNotificationType('')
    }, 5000)
  }

  const addNumber = (e) => {
    e.preventDefault()

    const hasName = persons.some((person) => person.name === newName)
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    if (hasName) {
      const isConfirm = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
      if (isConfirm) {
        const person = persons.find((person) => person.name === newName)
        const { id } = person
        const changedPerson = { ...person, number: newNumber }
        personService
          .update(id, changedPerson)
          .then((returnedPerson) => {
            setPersons(persons.map((p) => (p.id !== id ? p : returnedPerson)))
            cleanInputs()
          })
          .catch((error) => {
            showNotification(
              `Information of ${newName} has already been removed from server`,
              'error'
            )
            setPersons(persons.filter((p) => p.id !== id))
          })
      }

      return
    }
    if (newName && newNumber) {
      personService.create(newPerson).then((returnedPerson) => {
        setPersons([...persons, returnedPerson])
        cleanInputs()
        showNotification(`Added ${newName}`)
      })
    }
  }
  const filterNames = () => {
    if (!filterValue) return persons
    return persons.filter((person) => person.name.toLowerCase().includes(filterValue.toLowerCase()))
  }
  const deleteNumber = (id) => {
    const person = persons.find((person) => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id))
      })
    }
  }

  const filteredPersons = filterNames()

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={notificationType} message={notificationMessage} />
      <Filter value={filterValue} changeValue={changeFilterValue} filterNames={filterNames} />

      <h3>Add a new</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        changeName={changeName}
        changeNumber={changeNumber}
        addNumber={addNumber}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deleteNumber={deleteNumber} />
    </div>
  )
}

export default App
