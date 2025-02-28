const Country = ({id, name, handleShowDetails, isExpanded }) => {
  return (
    <div>
      {name.common} {' '}
      <button onClick={() => handleShowDetails(id)}>
        {isExpanded ? 'Hide' : 'Expand'}
      </button>
    </div>
  )
}

export default Country