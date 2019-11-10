import { reverseGeocode, createForwardClient } from './mapbox'

/**
 * Attempts to gather latitude and longitude data for the user
 *
 * @throws {PositionError} if the user does not accept the
 * permissions to obtain location data
 * @returns {Promise<{latitude: number, longitude: number}>} an
 * object with the latitude and longitude of the user
 */
const getBrowserPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      resolve({
        latitude: coords.latitude,
        longitude: coords.longitude
      })
    }, reject)
  })
}

class Location {
  /**
   * Gets the browser's current GeoLocation
   *
   * @throws {PositionError} if the user does not accept the
   * permissions to obtain location data
   * @returns {Promise<{
   *  lat: number,
   *  lng: number,
   *  hash: string,
   *  city: string,
   *  region: string
   * }>} a Promise that resolves to an object
   */
  static async getCurrentPosition() {
    try {
      const { longitude, latitude } = await getBrowserPosition()

      const location = await reverseGeocode({
        longitude,
        latitude
      })

      return new Location(location, true)
    } catch (e) {
      throw e
    }
  }

  static async createSearchClient() {
    const search = await createForwardClient()

    return async (searchText, coordinates) => {
      const results = await search(searchText, coordinates)

      return results && results.map(result => new Location(result))
    }
  }

  constructor(data) {
    this.id = data.id
    this.city = data.city
    this.region = data.region
    this.placeName = data.place_name
    this.address = data.address
    this.hash = data.hash
    this.latitude = data.latitude
    this.longitude = data.longitude
  }

  get displayName() {
    const address = this.address.split(',')

    return `${address[0]}, ${address[1]}`
  }
}

export default Location
