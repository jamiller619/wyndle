// import ambitious from 'ambitious'
import React from 'react'
import Backdrop from './Backdrop'
import colors from '/shared/colors.scss'

/**
 * Map a weather condition provided by the Dark Sky API to a
 * set of options for displaying the animated backdrop. The
 * options should follow the format:
 *  [lightness, saturation, backgroundColor, baseHue, rangeHue]
 */
const weatherConditionsColorMap = {
  rain: [],
  snow: [],
  sleet: [],
  wind: [],
  fog: [],
  cloudy: [],
  'clear-day': [60, 30, '#F59B86', 28, 65],
  'clear-night': [30, 70, '#0F1D32', 290, 80],
  'partly-cloudy-day': [60, 30, '#474747', 8, 20],
  'partly-cloudy-night': [30, 70, '#383838', 293, 40],

  // The following are options that may be added in the future,
  // according to the Dark Sky API
  hail: '',
  thunderstorm: '',
  tornado: '',

  // Default settings
  default: [50, 50, colors.colorPrimary, 32, 20]
}

const defaultBackdropProps = {
  circleCount: 9
  // baseTTL: 300
}

const WeatherBackdrop = ({ conditionSummary }) => {
  conditionSummary = conditionSummary || 'default'

  const [
    lightness,
    saturation,
    backgroundColor,
    baseHue,
    rangeHue
  ] = weatherConditionsColorMap[conditionSummary]

  const props = {
    ...defaultBackdropProps,
    lightness,
    saturation,
    backgroundColor,
    baseHue,
    rangeHue
  }

  return <Backdrop {...props} />
}

export default WeatherBackdrop
