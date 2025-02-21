const InputField = ({ searchInput, handleSearchChange}) => {
  return (
  <form>
        <div>
          filter shown with <input
          value={searchInput}
          onChange={handleSearchChange}
          />
        </div>
      </form>
  )
}

export default InputField