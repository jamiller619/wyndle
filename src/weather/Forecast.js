import fetch from 'fetch-jsonp'
import lscache from 'lscache'
import { store, darksky } from 'config'
import { throttle } from '/shared/utils'
import Condition from './condition'
import sampleData from './sample-data.json'

const storeKey = locationId => `${store.forecastKey}.${locationId}`

const fetchData = async ({ latitude, longitude }) => {
  const endpoint = `https://api.darksky.net/forecast/${darksky.key}/${latitude},${longitude}?exclude=minutely,flags`

  const response = await fetch(endpoint)
  const data = await response.json()

  return {
    date: Date.now(),
    current: new Condition(data.currently),
    daily: data.daily.data.map(daily => new Condition(daily)),
    hourly: data.hourly.data.map(hourly => new Condition(hourly))
  }
}

const fetchForecast = async location => {
  const key = storeKey(location.id)
  const forecast = lscache.get(key)

  if (forecast) {
    return forecast
  }

  try {
    const data = await fetchData(location)
    lscache.set(key, data, store.forecastCacheInMinutes)

    return data
  } catch (e) {
    throw e
  }
}

// export const getForecastByLocation = location => {
//   return throttle(500, () => fetchForecast(location))()
// }

export const getForecastByLocation = location => {
  return Promise.resolve(sampleData)
}
