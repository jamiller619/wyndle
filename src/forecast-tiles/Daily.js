import ambitious, { Fragment } from 'ambitious'
import Tile, { TileColumn } from '/tiles'
import WeatherIcon from '/icons/WeatherIcon'

import styles from './forecast-tiles.scss'

const Daily = ({ forecast, ...props }) => {
  forecast = forecast || new Array(4)

  return (
    <Tile title="This Week" {...props}>
      {forecast.slice(0, 4).map(weather => (
        <TileColumn
          top={
            <div class={styles.time}>
              <div>{weather.time[0]}</div>
              <div class={styles.smallTime}>{weather.time[1]}</div>
            </div>
          }
          center={<WeatherIcon icon={weather.icon} />}
          bottom={<div>{weather.temp}</div>}
        />
      ))}
    </Tile>
  )
}

export default Daily
