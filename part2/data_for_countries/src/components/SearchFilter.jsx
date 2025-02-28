const InputField = ({ searchInput, handleSearchChange}) => {
  return (
  <form>
        <div>
          find countries <input
          value={searchInput}
          onChange={handleSearchChange}
          />
        </div>
      </form>
  )
}

export default InputField