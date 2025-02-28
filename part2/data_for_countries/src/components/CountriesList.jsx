import Country from "./Country"
import CountryDetails from "./CountryDetails"



const CountriesList = ({ countries, limit, expandedCountryId, handleShowDetails }) => {
  if (countries.length === 0) {
    return <p>No countries found</p>
  }

  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />
  }

  return (
    <ul>
      {countries.length > limit ? (
        <p>Too many matches ({countries.length}), please refine your search.</p>
      ) : (
        countries.map(country => (
          <li key={country.cca2}>
            <Country
              id={country.ccn3}
              name={country.name}
              handleShowDetails={handleShowDetails}
              isExpanded={expandedCountryId === country.ccn3}
            />
            {expandedCountryId === country.ccn3 && (
              <CountryDetails country={country} />
            )}
          </li>
        ))
      )}
    </ul>
  )
}

export default CountriesList