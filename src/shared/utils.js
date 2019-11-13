/**
 * Helper to render the className prop on a Component.
 * @example <div {...classNames('classNameOne', 'classNameTwo')} />
 * @param  {...String} classNames Classnames, separated by commas
 */
export const classNames = (...classNames) => ({
  className: classNames.filter(className => className).join(' ')
})

export const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

export const lerp = (start, end, alpha) => start * (1 - alpha) + end * alpha

/**
 * Converts a Unix time into a JavaScript Date object
 *
 * @param {UnixTime} time The Unix time to convert
 * @returns {Date} Returns the converted JavaScript Date object
 */
export const convertUnixTime = time => new Date(time * 1000)

/**
 * Converts a number into a temperature, complete with a
 * degree sign
 *
 * @param {decimal|number} value The value to convert
 */
export const toTemperature = value => value && `${Math.round(value)}\u00B0`

/**
 * Converts a JavaScript Date object to display the hour
 * followed by AM/PM. ex: 3 PM
 *
 * @param {Date} date
 */
export const toHour = date => {
  if (!date) {
    return ''
  }

  return date.toLocaleString('en-US', {
    hour: 'numeric'
  })
}

export const throttle = (delay, fn) => {
  let lastCall = 0

  return (...args) => {
    const now = new Date().getTime()
    if (now - lastCall < delay) {
      return
    }
    lastCall = now

    return fn(...args)
  }
}

export const wait = waitTimeInMilliseconds => {
  return new Promise(resolve => setTimeout(resolve, waitTimeInMilliseconds))
}
