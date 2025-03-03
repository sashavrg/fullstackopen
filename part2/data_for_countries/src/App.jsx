import { useEffect, useState } from 'react'
import countriesService from './services/countries'
import weatherService from './services/weather'
import SearchFilter from './components/SearchFilter'
import CountriesList from './components/CountriesList'

function App() {
  const [countries, setCountries] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [expandedCountryId, setExpandedCountryId] = useState(null)
  const [weatherData, setWeatherData] = useState(null)


  //fetch all countries
  useEffect(() => {
    console.log('countries effect')
    countriesService
      .getAll()
      .then(initialCountries => {
        console.log('country prophecy fulfilled')
        setCountries(initialCountries)
      })
  }, [])

  //fetch weather data
  useEffect(() => {
    console.log('weather effect')
    if (expandedCountryId) {
      const country = countries.find(country => country.ccn3 === expandedCountryId)
      const cityName = country.capital[0] // capital city for each country is passed as an array and we need a string for the API request
      console.log('cityName', cityName)
      weatherService
        .getWeatherByCityName(cityName)
        .then(data => {
          console.log('weather data', data)
          setWeatherData(data)
        })
        .catch(error => {
          console.error('Error fetching weather data', error)
        })
    }
  }
  , [expandedCountryId, countries])

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
        weatherData={weatherData}
      />
    </>
  )
}

export default App