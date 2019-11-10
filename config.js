export const store = {
  forecastCacheInMinutes: 5,
  forecastKey: `wyndle.${process.env.NODE_ENV}.forecast`,
  userKey: `wyndle.${process.env.NODE_ENV}.user`
}

export const darksky = {
  key: process.env.DARKSKY_KEY
}

export const mapbox = {
  async getClient() {
    const geocoder = await import('@mapbox/mapbox-sdk/services/geocoding')

    return geocoder({
      accessToken: process.env.MAPBOX_ACCESS_TOKEN
    })
  }
}
