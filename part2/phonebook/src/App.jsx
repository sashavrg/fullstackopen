import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const nameExists = persons.some(person => person.name.toLowerCase === newName.toLowerCase)
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

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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
      <form>
        <div>
          filter shown with <input
          value={searchInput}
          onChange={handleSearchChange}
          />
        </div>
      </form>
      <h2>Add new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <li key={person.id}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  )
}

export default App;