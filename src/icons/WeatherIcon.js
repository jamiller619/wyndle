import React from 'react'
import weatherIconsMap from './weatherIconsMap'

import styles from './icons.scss'

const WeatherIcon = ({ icon }) => {
  return (
    <span className={styles.weatherIcon}>
      {String.fromCharCode(weatherIconsMap(icon))}
    </span>
  )
}

export default WeatherIcon
