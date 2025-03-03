const CountryDetails = ({ country, weatherData}) => {
  
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} <>km&sup2;</></p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`}/>
      <h2>
        Weather in {country.capital}
      </h2>
      {weatherData ? (
        <div>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description}/>
          <p>Wind: {weatherData.wind.speed} m/s</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  )
}

export default CountryDetails