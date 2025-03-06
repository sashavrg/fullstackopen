import { useState, useEffect } from 'react'

import personsService from './services/persons'

import Person from './components/Person'
import AddPersonForm from './components/AddPersonForm'
import SearchFilter from './components/SearchFilter'
import Notification from './components/Notification'

const App = (props) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    console.log('effect')
    personsService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons
        )
    })
  }, [])
  console.log('render', persons.length, 'persons')


  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    const numberExists = persons.some(person => person.number === newNumber)

    if (existingPerson) {
      //check if number is already associated with the same person
      if (existingPerson.number === newNumber) {
        window.alert(`${newName} already has the number ${newNumber} associated! No changes made.`)
      return
    }


    //if person exists, but number is different, ask if user wants to update number
    const confirmUpdate = window.confirm(
      `${newName} is already in the phonebook. Do you want to update the number?`
    )

    if (confirmUpdate) {
      const updatedPerson  = { ...existingPerson, number: newNumber }

      personsService
        .update(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person =>
            person.id === existingPerson.id ? returnedPerson : person
          ))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(
            `Succesfully updated ${existingPerson.name}'s number!`
          )
          setNotificationType('success')
          setTimeout(() => {
            setNotificationMessage(null)
        }, 5000)
        })
        .catch(error => {
          setNotificationMessage(
            `Information of ${existingPerson.name} has already been removed from the server`, error
          )
          setNotificationType('error')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== existingPerson.id))
        })
    }


    } else if (numberExists) {
      window.alert(`${newNumber} has already been added to the phonebook!`)
    } else {

    const personObject = {
      name: newName,
      number: newNumber
    }

    personsService
      .create(personObject)
      .then(returnedPerson => {
        console.log(returnedPerson)
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(
          `Succesfully added ${personObject.name}!`
        )
        setNotificationType('success')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })

    
  }
}

//delete person
const deletePerson = (id) => {
  if (window.confirm(`Are you sure you want to delete ${persons.find(person => person.id === id).name}'s contact?`)) {
    personsService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setNotificationMessage(
          `Succesfully deleted ${persons.find(person => person.id === id).name}!`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }
        , 5000)
      })
      .catch(error => {
        setNotificationMessage(
          `${persons.find(person => person.id === id).name} has already been removed from the server`, error
        )
        setNotificationType('error')
        setTimeout(() => {
          setNotificationMessage(null)
        }
        , 5000)
          setPersons(persons.filter(person => person.id !== id))
      })
  }
}
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(searchInput
      .toLowerCase()) ||
      person.number.includes(searchInput)
      )



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} notificationType={notificationType}/>
      <SearchFilter
        searchInput={searchInput}
        handleSearchChange={handleSearchChange}/>
      <h2>Add new</h2>
      <AddPersonForm
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
           <Person
           key={person.id}
           id={person.id}
           name={person.name}
           number={person.number}
           deletePerson={deletePerson}
         />
        )}
      </ul>
    </div>
  )
}

export default App