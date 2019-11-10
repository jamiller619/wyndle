import store from '/store'
import Location from '/location'

const user = {
  getActualLocation() {
    return Location.getCurrentPosition()
  },

  getLocations() {
    return store.get('locations').map(location => new Location(location)) || []
  },

  getLocation(locationId) {
    const location = this.getLocations().filter(loc => loc.id === locationId)

    if (location && location.length > 0) {
      return location[0]
    }

    return null
  },

  getActiveLocation() {
    const location = store.get('activeLocation')
    if (!location) {
      try {
        const actualLocation = this.getActualLocation()

        if (!actualLocation) {
          store.set('activeLocation', actualLocation)
        }

        return actualLocation
      } catch (e) {
        throw e
      }
    }
  },

  setActiveLocation(locationId) {
    const location = this.getLocation(locationId)

    if (location) {
      return store.set('activeLocation', location)
    }
  },

  saveLocation(location) {
    const existingLocation = user.getLocation(location.id)

    if (!existingLocation) {
      store.set('locations', [...user.getLocations(), location])

      return location
    }

    return existingLocation
  }
}

export default user
