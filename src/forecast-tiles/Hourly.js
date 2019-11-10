import React from 'react'
import Tile, { TileColumn } from '/tiles'
import { WeatherIcon } from '/icons'

import styles from './forecast-tiles.scss'

const Hourly = ({ forecast, ...props }) => {
  forecast = forecast || new Array(4)

  return (
    <Tile title="Today" {...props}>
      {forecast.slice(0, 4).map(weather => (
        <TileColumn
          key={weather.time[0]}
          top={
            <div className={styles.time}>
              <div>{weather.time[0]}</div>
              <div className={styles.smallTime}>{weather.time[1]}</div>
            </div>
          }
          center={<WeatherIcon icon={weather.icon} />}
          bottom={<div>{weather.temp}</div>}
        />
      ))}
    </Tile>
  )
}

export default Hourly
