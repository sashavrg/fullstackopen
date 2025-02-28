import { useEffect, useState } from 'react'
import countriesService from './services/countries'
import SearchFilter from './components/SearchFilter'
import CountriesList from './components/CountriesList'

function App() {
  const [countries, setCountries] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [expandedCountryId, setExpandedCountryId] = useState(null)

  useEffect(() => {
    console.log('effect')
    countriesService
      .getAll()
      .then(initialCountries => {
        console.log('prophecy fulfilled')
        setCountries(initialCountries)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value)
  }

  const limit = 10

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(searchInput
    .toLowerCase())
    )

    const handleShowDetails = id => {
      setExpandedCountryId(expandedCountryId === id ? null : id)
    }

  return (
    <>
      <div>
      <SearchFilter
        searchInput={searchInput}
        handleSearchChange={handleSearchChange}/>
      </div>
      <CountriesList 
        countries={countriesToShow}
        limit={limit}
        expandedCountryId={expandedCountryId}
        handleShowDetails={handleShowDetails}
      />
    </>
  )
}

export default App