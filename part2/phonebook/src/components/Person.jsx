const Person = ({ name, number, id, deletePerson }) => {
  return (
    <li>
      {name} {number}
      <button onClick={() => deletePerson(id)}>Delete</button>
      </li>
  )
}

export default Person