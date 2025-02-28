import Country from "./Country"
import CountryDetails from "./CountryDetails"

const CountriesList = ({ countries, limit }) => {
  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />
  }
  
  return (
    <ul>
      {countries.length > limit ? (
        <p>Too many matches ({countries.length}), please refine your search.</p>
      ) : (
        countries.map(country =>
          <Country
            key={country.cca2}
            id={country.ccn3}
            name={country.name}
          />
        )
      )}
    </ul>
  )
}

export default CountriesList