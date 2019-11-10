const m = input => decodeURIComponent(escape(input))

const charMap = {
  cloud: 0xea01,
  clouds: 0xea02,
  cloudsSunny: 0xea03,
  cloudyNight: 0xea04,
  fog: 0xea05,
  fogCloudy: 0xea06,
  fogNight: 0xea07,
  lightning: 0xea08,
  moon: 0xea09,
  partlyCloudy: 0xea0a,
  partlySunny: 0xea0b,
  rainCloudy: 0xea0c,
  rainDrop: 0xea0d,
  rainSun: 0xea0e,
  rainbow: 0xea0f,
  rainyNight: 0xea10,
  snowCloudy: 0xea11,
  snowFlake: 0xea12,
  snowSun: 0xea13,
  snowyNight: 0xea14,
  stormyCloud: 0xea15,
  stormyClouds: 0xea16,
  sun: 0xea17,
  sunset: 0xea18,
  tempHigh: 0xea19,
  tempLow: 0xea1a,
  tempMedium: 0xea1b,
  twister: 0xea1c,
  umbrella: 0xea1d,
  wind: 0xea1e
}

const weatherIconsMap = condition => {
  if (charMap[condition]) {
    return charMap[condition]
  }

  switch (condition) {
    case 'clear-night':
      return charMap.moon

    case 'partly-cloudy-night':
      return charMap.cloudyNight
  }
}

export default weatherIconsMap
