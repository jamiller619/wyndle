import { getForecastByLocation } from './Forecast'
import createContext from '/context/createContext'

export default (async function(location) {
  const weather = await getForecastByLocation(location)

  return createContext({
    ...weather,
    date: new Date(weather.date).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  })
})
