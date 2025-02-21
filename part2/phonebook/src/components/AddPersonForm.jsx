const AddPersonForm = ({newName, newNumber, addPerson, handleNameChange, handleNumberChange}) => {
  return (
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
  )
}

export default AddPersonForm