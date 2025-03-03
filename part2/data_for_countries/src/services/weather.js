import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY
const baseUrl = 'http://api.openweathermap.org/data/2.5/'

const getWeatherByCityName = async (cityName) => { //could also be done by Id
  try {
    const response = await axios.get(`${baseUrl}weather`, {
      params: {
        q: cityName,
        appid: api_key,
        units: 'metric' //for Celsius
      }
    })

    return response.data
  } catch (error) {
    console.error('Error fetching weather data', error)
    throw error //for handling of the error in the component
  }
}

export default { getWeatherByCityName }