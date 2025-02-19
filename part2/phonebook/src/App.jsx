import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1 }
  ]);
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    const nameExists = persons.some(person => person.name === newName)

    if (nameExists) {
      window.alert(`${newName} has already been added to the phonebook!`)
    } else {
      event.preventDefault()
    const personObject = {
      name: newName,
      id: String(persons.length + 1),
    };

    setPersons(persons.concat(personObject))
    setNewName('')
  }
}

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <li key={person.id}>{person.name}</li>
        )}
      </ul>
    </div>
  );
};

export default App;