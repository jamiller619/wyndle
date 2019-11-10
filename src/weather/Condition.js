import { toTemperature, toHour, convertUnixTime } from '/shared/utils'

class Condition {
  constructor(data) {
    this.temp = toTemperature(data.temperature)
    this.feelsLike = toTemperature(data.apparentTemperature)
    this.high = toTemperature(data.temperatureHigh)
    this.low = toTemperature(data.temperatureLow)

    this.time = toHour(convertUnixTime(data.time)).split(' ')

    this.summary = data.summary
    this.icon = data.icon
  }
}

export default Condition
