import { useState, useEffect } from 'react'
import personsService from './services/persons'
import Person from './components/Person'
import AddPersonForm from './components/AddPersonForm'
import SearchFilter from './components/SearchFilter'


const App = (props) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput] = useState('')

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
    const nameExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    const numberExists = persons.some(person => person.number === newNumber)

    if (nameExists) {
      window.alert(`${newName} has already been added to the phonebook!`)
    } else if (numberExists) {
      window.alert(`${newNumber} has already been added to the phonebook!`)
    } else {

    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    }

    personsService
      .create(personObject)
      .then(returnedPerson => {
        console.log(returnedPerson)
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
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
          <Person key={person.id} name={person.name} number={person.number}/>
        )}
      </ul>
    </div>
  )
}

export default App